import {
  Users, Calendar, ClipboardList, Stethoscope, Clock, FileText, Pill,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { useDashboardStats, useAppointments } from "@/hooks/useSupabaseData";

const DoctorDashboard = () => {
  const { stats } = useDashboardStats();
  const { appointments } = useAppointments();
  const today = new Date().toISOString().split("T")[0];
  const todayAppts = appointments.filter((a) => a.appointment_date === today);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Doctor Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Your schedule, patients & clinical overview for today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value={String(stats.totalPatients)} change={stats.totalPatients > 0 ? `${stats.totalPatients} registered` : "No patients"} changeType={stats.totalPatients > 0 ? "positive" : "neutral"} icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Today's OPD" value={String(stats.todayAppointments)} change={stats.todayAppointments > 0 ? `${stats.todayAppointments} scheduled` : "No OPD today"} changeType={stats.todayAppointments > 0 ? "positive" : "neutral"} icon={Calendar} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
        <StatCard title="Pending Lab Tests" value={String(stats.pendingLabTests)} change={stats.pendingLabTests > 0 ? "Reports pending" : "All clear"} changeType={stats.pendingLabTests > 0 ? "negative" : "neutral"} icon={ClipboardList} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
        <StatCard title="Completed Tests" value={String(stats.completedLabTests)} change={stats.completedLabTests > 0 ? "Reports ready" : "No reports"} changeType="neutral" icon={Pill} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">Today's Schedule</h3>
          {todayAppts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Clock className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm">No appointments scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppts.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="font-medium text-sm">{appt.patient_name}</p>
                    <p className="text-xs text-muted-foreground">{appt.appointment_type}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{appt.appointment_time?.slice(0, 5)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "300ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">Recent Consultations</h3>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No consultations yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
