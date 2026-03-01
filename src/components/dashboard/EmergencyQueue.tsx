import { Clock, ArrowRight, Ambulance } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEmergencyCases } from "@/hooks/useSupabaseData";

const getTriageStyles = (triage: string) => {
  switch (triage) {
    case "Immediate": return { badge: "bg-destructive text-destructive-foreground", ring: "ring-destructive/30", pulse: true };
    case "Emergency": return { badge: "bg-warning text-warning-foreground", ring: "ring-warning/30", pulse: false };
    case "Urgent": return { badge: "bg-yellow-500 text-white", ring: "ring-yellow-500/30", pulse: false };
    case "Non-Urgent": return { badge: "bg-success text-success-foreground", ring: "ring-success/30", pulse: false };
    default: return { badge: "bg-muted text-muted-foreground", ring: "", pulse: false };
  }
};

export const EmergencyQueue = () => {
  const { cases } = useEmergencyCases();
  const activeCases = cases.filter((c) => c.status !== "Discharged");

  if (activeCases.length === 0) {
    return (
      <div className="animate-fade-in rounded-xl bg-card shadow-card" style={{ animationDelay: "600ms" }}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
              <Ambulance className="h-4 w-4 text-destructive" />
            </div>
            <h3 className="font-display text-lg font-semibold">Casualty Queue</h3>
          </div>
          <Badge variant="outline" className="font-normal">0 waiting</Badge>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Ambulance className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">No emergency cases</p>
          <p className="text-xs mt-1">Emergency patients will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in rounded-xl bg-card shadow-card" style={{ animationDelay: "600ms" }}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
            <Ambulance className="h-4 w-4 text-destructive" />
          </div>
          <h3 className="font-display text-lg font-semibold">Casualty Queue</h3>
        </div>
        <Badge variant="destructive" className="animate-pulse-soft">{activeCases.length} waiting</Badge>
      </div>
      <div className="divide-y divide-border/50">
        {activeCases.slice(0, 5).map((patient, index) => {
          const styles = getTriageStyles(patient.triage);
          return (
            <div key={patient.id} className={cn("flex items-center gap-4 p-4 transition-colors hover:bg-muted/30", styles.pulse && "animate-pulse-soft")}>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ring-2", styles.badge, styles.ring)}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{patient.patient_name}</p>
                  <span className="text-sm text-muted-foreground">({patient.age} yrs)</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{patient.condition}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{patient.wait_time || "Just arrived"}</span>
                  </div>
                  <Badge className={cn(styles.badge, "mt-1")}>{patient.triage}</Badge>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8"><ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
