import {
  Pill, Package, AlertTriangle, IndianRupee,
} from "lucide-react";
import { StatCard } from "./StatCard";

const PharmacistDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Pharmacy Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Prescriptions, medicine stock & dispensing overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending Prescriptions" value="0" change="No pending" changeType="neutral" icon={Pill} iconColor="text-primary" iconBgColor="bg-primary/10" delay={0} />
        <StatCard title="Low Stock Items" value="0" change="Stock OK" changeType="neutral" icon={AlertTriangle} iconColor="text-warning" iconBgColor="bg-warning/10" delay={50} />
        <StatCard title="Dispensed Today" value="0" change="No dispensing" changeType="neutral" icon={Package} iconColor="text-info" iconBgColor="bg-info/10" delay={100} />
        <StatCard title="Today's Sales" value="₹0" change="No sales yet" changeType="neutral" icon={IndianRupee} iconColor="text-success" iconBgColor="bg-success/10" delay={150} />
      </div>

      <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
        <h3 className="font-display text-lg font-semibold mb-4">Prescription Queue</h3>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Pill className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No prescriptions to dispense</p>
          <p className="text-xs mt-1">Incoming prescriptions will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default PharmacistDashboard;
