import {
  Users, Calendar, ClipboardList, Stethoscope, Clock, FileText, IndianRupee, Pill,
} from "lucide-react";
import { StatCard } from "./StatCard";

const DoctorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Doctor Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Your schedule, patients & clinical overview for today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="My Patients" value="0" change="No patients assigned" changeType="neutral" icon={Users} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Today's OPD Slots" value="0" change="No OPD today" changeType="neutral" icon={Calendar} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
        <StatCard title="Pending Reports" value="0" change="No pending reports" changeType="neutral" icon={ClipboardList} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
        <StatCard title="Prescriptions Today" value="0" change="No prescriptions" changeType="neutral" icon={Pill} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Today's Schedule */}
        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">Today's Schedule</h3>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Clock className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No appointments scheduled</p>
            <p className="text-xs mt-1">Appointments will appear here once booked</p>
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "300ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">Recent Consultations</h3>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No consultations yet</p>
            <p className="text-xs mt-1">Patient consultations will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
