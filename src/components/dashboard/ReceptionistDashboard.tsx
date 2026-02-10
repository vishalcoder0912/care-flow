import {
  Users, Calendar, UserPlus, Clock, IndianRupee, Phone,
} from "lucide-react";
import { StatCard } from "./StatCard";

const ReceptionistDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Reception Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          OPD registrations, appointment queue & patient check-ins.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Registrations" value="0" change="No registrations" changeType="neutral" icon={UserPlus} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="OPD Queue" value="0" change="No patients waiting" changeType="neutral" icon={Clock} iconColor="text-warning" iconBgColor="bg-warning/10" delay={50} />
        <StatCard title="Appointments Today" value="0" change="No appointments" changeType="neutral" icon={Calendar} iconColor="text-info" iconBgColor="bg-info/10" delay={100} />
        <StatCard title="Today's Collection" value="₹0" change="No payments collected" changeType="neutral" icon={IndianRupee} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
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
