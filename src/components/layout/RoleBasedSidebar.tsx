import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Stethoscope, Calendar, Bed, AlertCircle,
  FileText, Settings, ChevronLeft, ChevronRight, Activity, Pill,
  FlaskConical, CreditCard, LogOut, Phone, Calculator, Package, TestTube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROLE_CONFIGS } from "@/types/roles";
import type { AppRole } from "@/types/roles";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: AppRole[];
}

const allMenuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", roles: ["admin", "doctor", "nurse", "patient", "receptionist", "lab_tech", "pharmacist", "accountant"] },
  { icon: Users, label: "Patients", path: "/patients", roles: ["admin", "doctor", "nurse", "receptionist"] },
  { icon: Stethoscope, label: "Doctors", path: "/doctors", roles: ["admin", "nurse", "patient", "receptionist"] },
  { icon: Calendar, label: "Appointments", path: "/appointments", roles: ["admin", "doctor", "nurse", "patient", "receptionist"] },
  { icon: Bed, label: "Departments", path: "/departments", roles: ["admin", "doctor", "nurse"] },
  { icon: AlertCircle, label: "Emergency", path: "/emergency", roles: ["admin", "doctor", "nurse", "receptionist"] },
  { icon: Pill, label: "Pharmacy", path: "/pharmacy", roles: ["admin", "doctor", "nurse", "patient", "pharmacist"] },
  { icon: FlaskConical, label: "Laboratory", path: "/laboratory", roles: ["admin", "doctor", "nurse", "patient", "lab_tech"] },
  { icon: FileText, label: "Reports", path: "/reports", roles: ["admin", "doctor", "accountant"] },
  { icon: CreditCard, label: "Billing", path: "/billing", roles: ["admin", "patient", "accountant", "receptionist"] },
];

const bottomMenuItems: MenuItem[] = [
  { icon: Settings, label: "Settings", path: "/settings", roles: ["admin", "doctor", "nurse", "patient", "receptionist", "lab_tech", "pharmacist", "accountant"] },
];

export const RoleBasedSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role, profile, signOut } = useAuth();

  const filteredMenuItems = allMenuItems.filter(
    (item) => role && item.roles.includes(role)
  );
  const filteredBottomItems = bottomMenuItems.filter(
    (item) => role && item.roles.includes(role)
  );

  const roleConfig = role ? ROLE_CONFIGS[role] : null;

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar transition-all duration-300 shadow-xl",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-display text-xl font-bold text-white tracking-tight">MediCare</h1>
              <p className="text-xs font-medium text-primary/90">Hospital Pro</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="border-b border-sidebar-border px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white/20">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {profile?.full_name || "User"}
              </p>
              {roleConfig && (
                <span className={cn("text-xs px-2 py-0.5 rounded-full capitalize", roleConfig.bgColor, roleConfig.color)}>
                  {roleConfig.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="custom-scrollbar flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          {!collapsed && "Main Menu"}
        </p>
        <ul className="space-y-1.5">
          {filteredMenuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "sidebar-link touch-target text-sidebar-foreground",
                    isActive && "active",
                    collapsed && "justify-center px-0"
                  )
                }
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0 text-white" />
                {!collapsed && <span className="animate-fade-in font-medium text-white">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-sidebar-border px-4 py-5">
        <ul className="space-y-1.5">
          {filteredBottomItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "sidebar-link touch-target text-sidebar-foreground",
                    isActive && "active",
                    collapsed && "justify-center px-0"
                  )
                }
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0 text-white" />
                {!collapsed && <span className="animate-fade-in font-medium text-white">{item.label}</span>}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={signOut}
              className={cn(
                "sidebar-link touch-target text-sidebar-foreground w-full hover:bg-destructive/20",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? "Sign Out" : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0 text-white" />
              {!collapsed && <span className="animate-fade-in font-medium text-white">Sign Out</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
