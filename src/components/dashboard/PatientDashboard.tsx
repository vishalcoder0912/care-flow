import {
  Calendar, FileText, Pill, IndianRupee, Heart, ClipboardList,
} from "lucide-react";
import { StatCard } from "./StatCard";

const PatientDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Patient Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Your health records, upcoming appointments & prescriptions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Upcoming Appointments" value="0" change="No upcoming visits" changeType="neutral" icon={Calendar} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Active Prescriptions" value="0" change="No prescriptions" changeType="neutral" icon={Pill} iconColor="text-info" iconBgColor="bg-info/10" delay={50} />
        <StatCard title="Lab Reports" value="0" change="No pending reports" changeType="neutral" icon={ClipboardList} iconColor="text-warning" iconBgColor="bg-warning/10" delay={100} />
        <StatCard title="Pending Bills" value="₹0" change="No outstanding" changeType="neutral" icon={IndianRupee} iconColor="text-destructive" iconBgColor="bg-destructive/10" delay={150} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">My Health Summary</h3>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Heart className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No health data recorded yet</p>
            <p className="text-xs mt-1">Vitals & records will appear after your first visit</p>
          </div>
        </div>

        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "300ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">Recent Visits</h3>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No visit history</p>
            <p className="text-xs mt-1">Past consultations will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
