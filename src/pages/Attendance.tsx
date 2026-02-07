import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Clock, Download, CalendarIcon, Users, Timer, TrendingUp, Filter, FileText, FileJson, Printer,
} from "lucide-react";
import { format, differenceInMinutes, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { downloadCSV, downloadJSON, printReport } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface AttendanceLog {
  id: string;
  user_id: string;
  check_in: string;
  check_out: string | null;
  total_hours: number | null;
  notes: string | null;
}

interface ProfileInfo {
  user_id: string;
  full_name: string | null;
}

const Attendance = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(startOfMonth(new Date()));
  const [dateTo, setDateTo] = useState<Date | undefined>(endOfMonth(new Date()));
  const [staffFilter, setStaffFilter] = useState("all");
  const [uniqueStaff, setUniqueStaff] = useState<{ id: string; name: string }[]>([]);

  const fetchData = async () => {
    setLoading(true);

    // Fetch all attendance logs (admin can see all)
    let query = supabase
      .from("attendance_logs")
      .select("*")
      .order("check_in", { ascending: false });

    if (dateFrom) query = query.gte("check_in", dateFrom.toISOString());
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      query = query.lte("check_in", end.toISOString());
    }

    const { data: logsData } = await query;

    if (logsData && logsData.length > 0) {
      setLogs(logsData);

      // Fetch profile names for all unique user_ids
      const userIds = [...new Set(logsData.map((l) => l.user_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", userIds);

      if (profilesData) {
        const map: Record<string, string> = {};
        const staff: { id: string; name: string }[] = [];
        profilesData.forEach((p: ProfileInfo) => {
          map[p.user_id] = p.full_name || "Unknown";
          staff.push({ id: p.user_id, name: p.full_name || "Unknown" });
        });
        setProfiles(map);
        setUniqueStaff(staff);
      }
    } else {
      setLogs([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [dateFrom, dateTo]);

  const filteredLogs = staffFilter === "all"
    ? logs
    : logs.filter((l) => l.user_id === staffFilter);

  // Stats
  const totalSessions = filteredLogs.length;
  const completedSessions = filteredLogs.filter((l) => l.check_out).length;
  const activeSessions = filteredLogs.filter((l) => !l.check_out).length;
  const totalHours = filteredLogs.reduce((sum, l) => sum + (l.total_hours || 0), 0);
  const avgHoursPerSession = completedSessions > 0 ? totalHours / completedSessions : 0;

  const handleExportCSV = () => {
    const data = {
      headers: ["Staff Name", "Check In", "Check Out", "Duration (hrs)", "Status"],
      rows: filteredLogs.map((log) => [
        profiles[log.user_id] || "Unknown",
        format(new Date(log.check_in), "yyyy-MM-dd HH:mm"),
        log.check_out ? format(new Date(log.check_out), "yyyy-MM-dd HH:mm") : "—",
        log.total_hours?.toFixed(2) || "—",
        log.check_out ? "Completed" : "Active",
      ]),
      title: "Attendance Report",
    };
    downloadCSV(data, `attendance-report-${format(new Date(), "yyyy-MM-dd")}`);
    toast({ title: "CSV Downloaded", description: "Attendance report exported." });
  };

  const handleExportJSON = () => {
    const data = {
      headers: ["Staff Name", "Check In", "Check Out", "Duration (hrs)", "Status"],
      rows: filteredLogs.map((log) => [
        profiles[log.user_id] || "Unknown",
        format(new Date(log.check_in), "yyyy-MM-dd HH:mm"),
        log.check_out ? format(new Date(log.check_out), "yyyy-MM-dd HH:mm") : "—",
        log.total_hours?.toFixed(2) || "—",
        log.check_out ? "Completed" : "Active",
      ]),
      title: "Attendance Report",
    };
    downloadJSON(data, `attendance-report-${format(new Date(), "yyyy-MM-dd")}`);
    toast({ title: "JSON Downloaded", description: "Attendance report exported." });
  };

  const handlePrint = () => {
    const rows = filteredLogs.map((log) => `
      <tr>
        <td>${profiles[log.user_id] || "Unknown"}</td>
        <td>${format(new Date(log.check_in), "MMM dd, yyyy HH:mm")}</td>
        <td>${log.check_out ? format(new Date(log.check_out), "MMM dd, yyyy HH:mm") : "—"}</td>
        <td>${log.total_hours?.toFixed(2) || "—"}</td>
        <td><span class="status-badge ${log.check_out ? "status-success" : "status-warning"}">${log.check_out ? "Completed" : "Active"}</span></td>
      </tr>
    `).join("");

    const content = `
      <div class="summary-cards">
        <div class="summary-card primary"><div class="summary-card-value">${totalSessions}</div><div class="summary-card-label">Total Sessions</div></div>
        <div class="summary-card success"><div class="summary-card-value">${totalHours.toFixed(1)}h</div><div class="summary-card-label">Total Hours</div></div>
        <div class="summary-card warning"><div class="summary-card-value">${avgHoursPerSession.toFixed(1)}h</div><div class="summary-card-label">Avg per Session</div></div>
        <div class="summary-card"><div class="summary-card-value">${activeSessions}</div><div class="summary-card-label">Currently Active</div></div>
      </div>
      <h2>Attendance Logs</h2>
      <table>
        <thead><tr><th>Staff Name</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    printReport(
      "Staff Attendance Report",
      content,
      `Report period: ${dateFrom ? format(dateFrom, "MMM dd, yyyy") : "—"} to ${dateTo ? format(dateTo, "MMM dd, yyyy") : "—"}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Staff Attendance</h1>
          <p className="mt-1 text-muted-foreground">Monitor staff check-in/check-out logs and export reports.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportCSV}><FileText className="h-4 w-4 mr-2" /> CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportJSON}><FileJson className="h-4 w-4 mr-2" /> JSON</DropdownMenuItem>
            <DropdownMenuItem onClick={handlePrint}><Printer className="h-4 w-4 mr-2" /> Print / PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="rounded-xl bg-primary/10 p-3"><Users className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold">{totalSessions}</p><p className="text-sm text-muted-foreground">Total Sessions</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="rounded-xl bg-success/10 p-3"><Timer className="h-5 w-5 text-success" /></div><div><p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p><p className="text-sm text-muted-foreground">Total Hours</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="rounded-xl bg-info/10 p-3"><TrendingUp className="h-5 w-5 text-info" /></div><div><p className="text-2xl font-bold">{avgHoursPerSession.toFixed(1)}h</p><p className="text-sm text-muted-foreground">Avg / Session</p></div></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-center gap-4"><div className="rounded-xl bg-warning/10 p-3"><Clock className="h-5 w-5 text-warning" /></div><div><p className="text-2xl font-bold">{activeSessions}</p><p className="text-sm text-muted-foreground">Active Now</p></div></div></CardContent></Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <Label className="text-sm font-medium">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[200px] justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[200px] justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Staff Member</Label>
              <Select value={staffFilter} onValueChange={setStaffFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Staff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  {uniqueStaff.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={fetchData} className="gap-2">
              <Filter className="h-4 w-4" /> Apply
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Attendance Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No attendance records found</p>
              <p className="text-sm">Try adjusting the date range or staff filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Name</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{profiles[log.user_id] || "Unknown"}</TableCell>
                      <TableCell>{format(new Date(log.check_in), "MMM dd, yyyy HH:mm")}</TableCell>
                      <TableCell>{log.check_out ? format(new Date(log.check_out), "MMM dd, yyyy HH:mm") : "—"}</TableCell>
                      <TableCell>{log.total_hours ? `${log.total_hours.toFixed(2)}h` : "—"}</TableCell>
                      <TableCell>
                        {log.check_out ? (
                          <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
                        ) : (
                          <Badge className="bg-warning/10 text-warning border-warning/20">Active</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
