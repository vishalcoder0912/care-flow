import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

// Empty state — will show real data from database when available
const appointments: any[] = [];

export const AppointmentsToday = () => {
  if (appointments.length === 0) {
    return (
      <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "400ms" }}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Today's OPD</h3>
          <Badge variant="outline" className="font-normal">0 scheduled</Badge>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Calendar className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No OPD appointments today</p>
          <p className="text-xs mt-1">Appointments will appear here once scheduled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "400ms" }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Today's OPD</h3>
        <Badge variant="outline" className="font-normal">{appointments.length} scheduled</Badge>
      </div>
      <div className="space-y-3">
        {/* appointments will be mapped here when data available */}
      </div>
    </div>
  );
};
