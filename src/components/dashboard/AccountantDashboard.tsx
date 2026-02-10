import {
  IndianRupee, CreditCard, FileText, TrendingUp,
} from "lucide-react";
import { StatCard } from "./StatCard";

const AccountantDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Accounts Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Revenue, billing, collections & financial summary.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Revenue" value="₹0" change="No revenue" changeType="neutral" icon={IndianRupee} iconColor="text-success" iconBgColor="bg-success/10" delay={0} />
        <StatCard title="Pending Invoices" value="0" change="No pending" changeType="neutral" icon={FileText} iconColor="text-warning" iconBgColor="bg-warning/10" delay={50} />
        <StatCard title="Payments Received" value="₹0" change="No payments" changeType="neutral" icon={CreditCard} iconColor="text-primary" iconBgColor="bg-primary/10" delay={100} />
        <StatCard title="Monthly Revenue" value="₹0" change="No data yet" changeType="neutral" icon={TrendingUp} iconColor="text-info" iconBgColor="bg-info/10" delay={150} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "200ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <CreditCard className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No transactions recorded</p>
            <p className="text-xs mt-1">Billing transactions will appear here</p>
          </div>
        </div>

        <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "300ms" }}>
          <h3 className="font-display text-lg font-semibold mb-4">Outstanding Dues</h3>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm">No outstanding dues</p>
            <p className="text-xs mt-1">Unpaid invoices will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantDashboard;
