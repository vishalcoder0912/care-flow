import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { useAppointments } from "@/hooks/useSupabaseData";

export const AppointmentsToday = () => {
  const { appointments } = useAppointments();
  const today = new Date().toISOString().split("T")[0];
  const todayAppts = appointments.filter((a) => a.appointment_date === today);

  if (todayAppts.length === 0) {
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
        <Badge variant="outline" className="font-normal">{todayAppts.length} scheduled</Badge>
      </div>
      <div className="space-y-3">
        {todayAppts.slice(0, 5).map((appt) => (
          <div key={appt.id} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="font-medium text-sm">{appt.patient_name}</p>
              <p className="text-xs text-muted-foreground">Dr. {appt.doctor_name} • {appt.appointment_type}</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{appt.appointment_time?.slice(0, 5)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
