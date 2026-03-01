import {
  Users, Calendar, UserPlus, Clock, IndianRupee,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { useDashboardStats } from "@/hooks/useSupabaseData";

const ReceptionistDashboard = () => {
  const { stats } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Reception Dashboard</h1>
        <p className="mt-1 text-muted-foreground">OPD registrations, appointment queue & patient check-ins.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value={String(stats.totalPatients)} change={stats.totalPatients > 0 ? `${stats.totalPatients} registered` : "No registrations"} changeType={stats.totalPatients > 0 ? "positive" : "neutral"} icon={UserPlus} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Emergency Cases" value={String(stats.emergencyCases)} change={stats.emergencyCases > 0 ? "Active cases" : "No cases"} changeType={stats.emergencyCases > 0 ? "negative" : "neutral"} icon={Clock} iconColor="text-warning" iconBgColor="bg-warning/10" delay={50} />
        <StatCard title="Today's OPD" value={String(stats.todayAppointments)} change={stats.todayAppointments > 0 ? `${stats.todayAppointments} appointments` : "No appointments"} changeType={stats.todayAppointments > 0 ? "positive" : "neutral"} icon={Calendar} iconColor="text-info" iconBgColor="bg-info/10" delay={100} />
        <StatCard title="Today's Revenue" value={`₹${stats.todayRevenue.toLocaleString("en-IN")}`} change={stats.todayRevenue > 0 ? "Collected" : "No payments"} changeType={stats.todayRevenue > 0 ? "positive" : "neutral"} icon={IndianRupee} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
      </div>

      <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
        <h3 className="font-display text-lg font-semibold mb-4">OPD Check-in Queue</h3>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No patients in queue</p>
          <p className="text-xs mt-1">Registered patients will appear here for check-in</p>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
