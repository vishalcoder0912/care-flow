import {
  Users, Stethoscope, Calendar, Bed, IndianRupee, Activity, Building2, Ambulance,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { QuickActions } from "./QuickActions";
import { RecentPatients } from "./RecentPatients";
import { AppointmentsToday } from "./AppointmentsToday";
import { DepartmentOverview } from "./DepartmentOverview";
import { EmergencyQueue } from "./EmergencyQueue";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Hospital overview — manage all departments, staff & operations.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Patients" value="0" change="No data yet" changeType="neutral" icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Active Doctors" value="0" change="No data yet" changeType="neutral" icon={Stethoscope} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
        <StatCard title="Today's OPD" value="0" change="No appointments" changeType="neutral" icon={Calendar} iconColor="text-success" iconBgColor="bg-success/10" delay={100} />
        <StatCard title="Bed Occupancy" value="0%" change="0 beds occupied" changeType="neutral" icon={Bed} iconColor="text-warning" iconBgColor="bg-warning/10" delay={150} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Revenue" value="₹0" change="No revenue yet" changeType="neutral" icon={IndianRupee} iconColor="text-success" iconBgColor="bg-success/10" delay={200} />
        <StatCard title="Emergency (Casualty)" value="0" change="No cases today" changeType="neutral" icon={Ambulance} iconColor="text-destructive" iconBgColor="bg-destructive/10" delay={250} />
        <StatCard title="IPD Admissions" value="0" change="No admissions" changeType="neutral" icon={Building2} iconColor="text-info" iconBgColor="bg-info/10" delay={300} />
        <StatCard title="Staff On Duty" value="0" change="No staff data" changeType="neutral" icon={Activity} iconColor="text-primary" iconBgColor="bg-primary/10" delay={350} />
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
