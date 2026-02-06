import { DEMO_CREDENTIALS, ROLE_CONFIGS } from "@/types/roles";
import {
  Shield, Stethoscope, Heart, Users, Phone, FlaskConical, Pill, Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppRole } from "@/types/roles";

const ROLE_ICONS: Record<AppRole, React.ElementType> = {
  admin: Shield,
  doctor: Stethoscope,
  nurse: Heart,
  patient: Users,
  receptionist: Phone,
  lab_tech: FlaskConical,
  pharmacist: Pill,
  accountant: Calculator,
};

interface DemoCredentialsProps {
  onSelect: (email: string, password: string) => void;
}

export const DemoCredentials = ({ onSelect }: DemoCredentialsProps) => {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Demo Accounts — Click to auto-fill
      </p>
      <div className="grid grid-cols-2 gap-2">
        {DEMO_CREDENTIALS.map((cred) => {
          const Icon = ROLE_ICONS[cred.role];
          const config = ROLE_CONFIGS[cred.role];
          return (
            <button
              key={cred.role}
              type="button"
              onClick={() => onSelect(cred.email, cred.password)}
              className={cn(
                "flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2 text-left transition-all",
                "hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm"
              )}
            >
              <Icon className="h-4 w-4 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{config.label}</p>
                <p className="text-[10px] text-muted-foreground truncate">{cred.email}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
