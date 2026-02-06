import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, LogIn, LogOut, Timer } from "lucide-react";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface AttendanceLog {
  id: string;
  user_id: string;
  check_in: string;
  check_out: string | null;
  total_hours: number | null;
  notes: string | null;
}

export const AttendanceTracker = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeSession, setActiveSession] = useState<AttendanceLog | null>(null);
  const [recentLogs, setRecentLogs] = useState<AttendanceLog[]>([]);
  const [elapsed, setElapsed] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    if (!user) return;

    const { data: active } = await supabase
      .from("attendance_logs")
      .select("*")
      .eq("user_id", user.id)
      .is("check_out", null)
      .order("check_in", { ascending: false })
      .limit(1)
      .single();

    if (active) setActiveSession(active);
    else setActiveSession(null);

    const { data: logs } = await supabase
      .from("attendance_logs")
      .select("*")
      .eq("user_id", user.id)
      .not("check_out", "is", null)
      .order("check_in", { ascending: false })
      .limit(7);

    if (logs) setRecentLogs(logs);
  };

  useEffect(() => {
    fetchAttendance();
  }, [user]);

  // Live elapsed timer
  useEffect(() => {
    if (!activeSession) { setElapsed(""); return; }
    const interval = setInterval(() => {
      const mins = differenceInMinutes(new Date(), new Date(activeSession.check_in));
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      setElapsed(`${h}h ${m}m`);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession]);

  const handleCheckIn = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("attendance_logs")
      .insert({ user_id: user.id, check_in: new Date().toISOString() });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Checked In!", description: "Your shift has started." });
      fetchAttendance();
    }
    setLoading(false);
  };

  const handleCheckOut = async () => {
    if (!user || !activeSession) return;
    setLoading(true);
    const now = new Date();
    const hours = differenceInMinutes(now, new Date(activeSession.check_in)) / 60;
    const { error } = await supabase
      .from("attendance_logs")
      .update({ check_out: now.toISOString(), total_hours: parseFloat(hours.toFixed(2)) })
      .eq("id", activeSession.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Checked Out!", description: `Total: ${hours.toFixed(1)} hours` });
      fetchAttendance();
    }
    setLoading(false);
  };

  const totalWeekHours = recentLogs.reduce((sum, l) => sum + (l.total_hours || 0), 0);

  return (
    <Card className="border-border/50 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Attendance Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status & Action */}
        <div className="flex items-center justify-between rounded-xl bg-muted/50 p-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            {activeSession ? (
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-success text-success-foreground">On Duty</Badge>
                <span className="text-lg font-bold text-foreground flex items-center gap-1">
                  <Timer className="h-4 w-4" /> {elapsed}
                </span>
              </div>
            ) : (
              <Badge variant="secondary" className="mt-1">Off Duty</Badge>
            )}
          </div>
          {activeSession ? (
            <Button onClick={handleCheckOut} disabled={loading} variant="destructive" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" /> Check Out
            </Button>
          ) : (
            <Button onClick={handleCheckIn} disabled={loading} size="sm" className="gap-2">
              <LogIn className="h-4 w-4" /> Check In
            </Button>
          )}
        </div>

        {/* Weekly summary */}
        <div className="rounded-xl border border-border/50 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Last 7 Sessions</p>
          <p className="text-2xl font-bold text-foreground">{totalWeekHours.toFixed(1)}h</p>
        </div>

        {/* Recent logs */}
        {recentLogs.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Recent</p>
            {recentLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="flex items-center justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
                <span className="text-muted-foreground">
                  {format(new Date(log.check_in), "MMM dd, HH:mm")}
                </span>
                <span className="font-medium">{log.total_hours?.toFixed(1)}h</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
