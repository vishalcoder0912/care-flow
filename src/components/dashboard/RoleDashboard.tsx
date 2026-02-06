import { AppRole } from "@/types/roles";
import { useAuth } from "@/hooks/useAuth";
import { StatCard } from "./StatCard";
import { QuickActions } from "./QuickActions";
import { RecentPatients } from "./RecentPatients";
import { AppointmentsToday } from "./AppointmentsToday";
import { DepartmentOverview } from "./DepartmentOverview";
import { EmergencyQueue } from "./EmergencyQueue";
import { AttendanceTracker } from "./AttendanceTracker";
import {
  Users, Stethoscope, Calendar, Bed, Pill, FlaskConical,
  CreditCard, ClipboardList, Phone, FileText, DollarSign,
  Activity, Clock, UserCheck, Package, TestTube,
} from "lucide-react";

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Patients" value="1,247" change="+12% from last month" changeType="positive" icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Active Staff" value="189" change="8 roles active" changeType="positive" icon={UserCheck} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
      <StatCard title="Today's Appointments" value="156" change="+8% from yesterday" changeType="positive" icon={Calendar} iconColor="text-success" iconBgColor="bg-success/10" delay={100} />
      <StatCard title="Revenue (Monthly)" value="$142K" change="+15% growth" changeType="positive" icon={DollarSign} iconColor="text-warning" iconBgColor="bg-warning/10" delay={150} />
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
      <div className="lg:col-span-1"><EmergencyQueue /></div>
    </div>
  </div>
);

const DoctorDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="My Patients" value="45" change="3 new today" changeType="positive" icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Today's Appointments" value="12" change="Next in 30 min" changeType="neutral" icon={Calendar} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
      <StatCard title="Pending Reports" value="8" change="2 urgent" changeType="negative" icon={FileText} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
      <StatCard title="Surgeries This Week" value="3" change="Next: Tomorrow" changeType="neutral" icon={Activity} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <AppointmentsToday />
        <RecentPatients />
      </div>
      <div className="space-y-6 lg:col-span-1">
        <AttendanceTracker />
        <EmergencyQueue />
      </div>
    </div>
  </div>
);

const NurseDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Assigned Patients" value="18" change="Ward A & B" changeType="neutral" icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Medication Rounds" value="4" change="Next in 2h" changeType="neutral" icon={Pill} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
      <StatCard title="Vitals Pending" value="6" change="Due in 1h" changeType="negative" icon={Activity} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
      <StatCard title="Bed Occupancy" value="82%" change="3 beds free" changeType="neutral" icon={Bed} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <RecentPatients />
        <DepartmentOverview />
      </div>
      <div className="space-y-6 lg:col-span-1">
        <AttendanceTracker />
        <EmergencyQueue />
      </div>
    </div>
  </div>
);

const PatientDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Upcoming Visits" value="2" change="Next: Jan 15" changeType="neutral" icon={Calendar} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Prescriptions" value="3" change="1 refill needed" changeType="negative" icon={Pill} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
      <StatCard title="Lab Results" value="5" change="1 pending" changeType="neutral" icon={FlaskConical} iconColor="text-success" iconBgColor="bg-success/10" delay={100} />
      <StatCard title="Outstanding Bills" value="$250" change="Due Feb 1" changeType="negative" icon={CreditCard} iconColor="text-warning" iconBgColor="bg-warning/10" delay={150} />
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <AppointmentsToday />
      <DepartmentOverview />
    </div>
  </div>
);

const ReceptionistDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Walk-ins Today" value="23" change="+5 from avg" changeType="positive" icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Appointments Today" value="48" change="6 pending check-in" changeType="neutral" icon={Calendar} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
      <StatCard title="Calls Received" value="67" change="+12 missed" changeType="negative" icon={Phone} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
      <StatCard title="Registrations" value="8" change="Today" changeType="positive" icon={ClipboardList} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <AppointmentsToday />
        <RecentPatients />
      </div>
      <div className="lg:col-span-1">
        <AttendanceTracker />
      </div>
    </div>
  </div>
);

const LabTechDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Pending Tests" value="34" change="12 urgent" changeType="negative" icon={TestTube} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Completed Today" value="28" change="+18% efficiency" changeType="positive" icon={FlaskConical} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
      <StatCard title="Samples Collected" value="42" change="6 pending" changeType="neutral" icon={Package} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
      <StatCard title="Reports Sent" value="25" change="3 awaiting review" changeType="neutral" icon={FileText} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <RecentPatients />
      </div>
      <div className="lg:col-span-1">
        <AttendanceTracker />
      </div>
    </div>
  </div>
);

const PharmacistDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Prescriptions Today" value="67" change="+8 pending" changeType="neutral" icon={Pill} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Low Stock Items" value="12" change="3 critical" changeType="negative" icon={Package} iconColor="text-warning" iconBgColor="bg-warning/10" delay={50} />
      <StatCard title="Dispensed Today" value="54" change="+22% from avg" changeType="positive" icon={ClipboardList} iconColor="text-info" iconBgColor="bg-info/10" delay={100} />
      <StatCard title="Expired Items" value="5" change="Needs disposal" changeType="negative" icon={FlaskConical} iconColor="text-destructive" iconBgColor="bg-destructive/10" delay={150} />
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <RecentPatients />
      </div>
      <div className="lg:col-span-1">
        <AttendanceTracker />
      </div>
    </div>
  </div>
);

const AccountantDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Today's Revenue" value="$18,450" change="+12% from avg" changeType="positive" icon={DollarSign} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
      <StatCard title="Pending Invoices" value="34" change="$12,300 total" changeType="neutral" icon={FileText} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
      <StatCard title="Overdue Payments" value="8" change="$4,200 outstanding" changeType="negative" icon={CreditCard} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
      <StatCard title="Monthly Collections" value="$142K" change="+15% target met" changeType="positive" icon={Activity} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <DepartmentOverview />
      <RecentPatients />
    </div>
  </div>
);

const DASHBOARD_MAP: Record<AppRole, React.FC> = {
  admin: AdminDashboard,
  doctor: DoctorDashboard,
  nurse: NurseDashboard,
  patient: PatientDashboard,
  receptionist: ReceptionistDashboard,
  lab_tech: LabTechDashboard,
  pharmacist: PharmacistDashboard,
  accountant: AccountantDashboard,
};

export const RoleDashboard = () => {
  const { role, profile } = useAuth();
  const DashboardComponent = DASHBOARD_MAP[role || "patient"];
  const greeting = profile?.full_name ? `Welcome back, ${profile.full_name}!` : "Welcome back!";

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">{greeting} Here's your overview.</p>
      </div>
      <DashboardComponent />
    </div>
  );
};
