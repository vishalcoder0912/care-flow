import {
  FlaskConical, ClipboardList, Clock, CheckCircle,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { useDashboardStats } from "@/hooks/useSupabaseData";

const LabTechDashboard = () => {
  const { stats } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Laboratory Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Pending tests, sample collection & report status.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending Tests" value={String(stats.pendingLabTests)} change={stats.pendingLabTests > 0 ? `${stats.pendingLabTests} pending` : "All clear"} changeType={stats.pendingLabTests > 0 ? "negative" : "neutral"} icon={FlaskConical} iconColor="text-warning" iconBgColor="bg-warning/10" delay={0} />
        <StatCard title="Total Patients" value={String(stats.totalPatients)} change="Registered" changeType="neutral" icon={ClipboardList} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
        <StatCard title="Emergency Cases" value={String(stats.emergencyCases)} change={stats.emergencyCases > 0 ? "Active" : "None"} changeType={stats.emergencyCases > 0 ? "negative" : "neutral"} icon={Clock} iconColor="text-destructive" iconBgColor="bg-destructive/10" delay={100} />
        <StatCard title="Completed Tests" value={String(stats.completedLabTests)} change={stats.completedLabTests > 0 ? "Reports ready" : "No tests completed"} changeType={stats.completedLabTests > 0 ? "positive" : "neutral"} icon={CheckCircle} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
      </div>

      <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
        <h3 className="font-display text-lg font-semibold mb-4">Test Queue</h3>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <FlaskConical className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No tests in queue</p>
          <p className="text-xs mt-1">Lab test requests will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default LabTechDashboard;
