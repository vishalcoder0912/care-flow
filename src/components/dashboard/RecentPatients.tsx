import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Users } from "lucide-react";

// Empty state — will show real data from database when available
const patients: any[] = [];

const getStatusStyles = (type: string) => {
  switch (type) {
    case "success":
      return "bg-success/10 text-success border-success/20";
    case "warning":
      return "bg-warning/10 text-warning border-warning/20";
    case "danger":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "info":
      return "bg-info/10 text-info border-info/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const RecentPatients = () => {
  if (patients.length === 0) {
    return (
      <div className="animate-fade-in rounded-xl bg-card shadow-card" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="font-display text-lg font-semibold">Recent Patients</h3>
          <Badge variant="outline" className="font-normal">0 patients</Badge>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Users className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No patients registered yet</p>
          <p className="text-xs mt-1">Patient records will appear here once added</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in rounded-xl bg-card shadow-card" style={{ animationDelay: "300ms" }}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-display text-lg font-semibold">Recent Patients</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Patient</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Department</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Admitted</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient: any) => (
              <tr key={patient.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback>{patient.name?.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.age} yrs, {patient.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{patient.department}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={getStatusStyles(patient.statusType)}>{patient.status}</Badge>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{patient.admittedDate}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
