import {
  Users, Bed, ClipboardList, Activity, Thermometer, Pill,
} from "lucide-react";
import { StatCard } from "./StatCard";

const NurseDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Nurse Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Ward overview, patient vitals & nursing tasks for your shift.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Assigned Patients" value="0" change="No assignments" changeType="neutral" icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Ward Beds Occupied" value="0" change="No occupancy data" changeType="neutral" icon={Bed} iconColor="text-warning" iconBgColor="bg-warning/10" delay={50} />
        <StatCard title="Pending Vitals" value="0" change="All vitals recorded" changeType="neutral" icon={Thermometer} iconColor="text-destructive" iconBgColor="bg-destructive/10" delay={100} />
        <StatCard title="Medicine Rounds" value="0" change="No pending rounds" changeType="neutral" icon={Pill} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
      </div>

      <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
        <h3 className="font-display text-lg font-semibold mb-4">Nursing Tasks</h3>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <ClipboardList className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No tasks assigned yet</p>
          <p className="text-xs mt-1">Shift tasks will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;
