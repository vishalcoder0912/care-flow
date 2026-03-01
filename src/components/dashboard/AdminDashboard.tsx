import {
  Users, Stethoscope, Calendar, Bed, IndianRupee, Activity, Building2, Ambulance,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { QuickActions } from "./QuickActions";
import { RecentPatients } from "./RecentPatients";
import { AppointmentsToday } from "./AppointmentsToday";
import { DepartmentOverview } from "./DepartmentOverview";
import { EmergencyQueue } from "./EmergencyQueue";
import { useDashboardStats } from "@/hooks/useSupabaseData";

const AdminDashboard = () => {
  const { stats, loading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Hospital overview — manage all departments, staff & operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value={String(stats.totalPatients)} change={stats.totalPatients > 0 ? `${stats.totalPatients} registered` : "No data yet"} changeType={stats.totalPatients > 0 ? "positive" : "neutral"} icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Active Doctors" value={String(stats.totalDoctors)} change={stats.totalDoctors > 0 ? `${stats.totalDoctors} on staff` : "No data yet"} changeType={stats.totalDoctors > 0 ? "positive" : "neutral"} icon={Stethoscope} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
        <StatCard title="Today's OPD" value={String(stats.todayAppointments)} change={stats.todayAppointments > 0 ? `${stats.todayAppointments} appointments` : "No appointments"} changeType={stats.todayAppointments > 0 ? "positive" : "neutral"} icon={Calendar} iconColor="text-success" iconBgColor="bg-success/10" delay={100} />
        <StatCard title="Emergency Cases" value={String(stats.emergencyCases)} change={stats.emergencyCases > 0 ? `${stats.emergencyCases} active` : "No cases"} changeType={stats.emergencyCases > 0 ? "negative" : "neutral"} icon={Ambulance} iconColor="text-destructive" iconBgColor="bg-destructive/10" delay={150} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Revenue" value={`₹${stats.todayRevenue.toLocaleString("en-IN")}`} change={stats.todayRevenue > 0 ? "Revenue collected" : "No revenue yet"} changeType={stats.todayRevenue > 0 ? "positive" : "neutral"} icon={IndianRupee} iconColor="text-success" iconBgColor="bg-success/10" delay={200} />
        <StatCard title="Pending Lab Tests" value={String(stats.pendingLabTests)} change={stats.pendingLabTests > 0 ? `${stats.pendingLabTests} pending` : "All clear"} changeType={stats.pendingLabTests > 0 ? "negative" : "neutral"} icon={Activity} iconColor="text-warning" iconBgColor="bg-warning/10" delay={250} />
        <StatCard title="Medicines in Stock" value={String(stats.totalMedicines)} change={stats.lowStockMedicines > 0 ? `${stats.lowStockMedicines} low stock` : "Stock OK"} changeType={stats.lowStockMedicines > 0 ? "negative" : "neutral"} icon={Building2} iconColor="text-info" iconBgColor="bg-info/10" delay={300} />
        <StatCard title="Pending Invoices" value={String(stats.pendingInvoices)} change={stats.pendingInvoices > 0 ? `${stats.pendingInvoices} unpaid` : "All paid"} changeType={stats.pendingInvoices > 0 ? "negative" : "neutral"} icon={IndianRupee} iconColor="text-primary" iconBgColor="bg-primary/10" delay={350} />
      </div>

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RecentPatients />
          <div className="grid gap-6 md:grid-cols-2">
            <DepartmentOverview />
            <AppointmentsToday />
          </div>
        </div>
        <div className="lg:col-span-1">
          <EmergencyQueue />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
