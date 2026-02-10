import { cn } from "@/lib/utils";

const departments = [
  { name: "Casualty (Emergency)", totalBeds: 30, occupied: 0, color: "bg-destructive", trend: "No data" },
  { name: "ICU / MICU / SICU", totalBeds: 20, occupied: 0, color: "bg-warning", trend: "No data" },
  { name: "Cardiology", totalBeds: 40, occupied: 0, color: "bg-primary", trend: "No data" },
  { name: "Orthopaedics", totalBeds: 35, occupied: 0, color: "bg-info", trend: "No data" },
  { name: "Paediatrics", totalBeds: 25, occupied: 0, color: "bg-success", trend: "No data" },
  { name: "Obstetrics & Gynaecology", totalBeds: 30, occupied: 0, color: "bg-accent", trend: "No data" },
  { name: "General Medicine", totalBeds: 50, occupied: 0, color: "bg-primary", trend: "No data" },
  { name: "General Surgery", totalBeds: 40, occupied: 0, color: "bg-info", trend: "No data" },
  { name: "ENT", totalBeds: 15, occupied: 0, color: "bg-warning", trend: "No data" },
  { name: "Ophthalmology", totalBeds: 15, occupied: 0, color: "bg-success", trend: "No data" },
  { name: "Dermatology", totalBeds: 10, occupied: 0, color: "bg-accent", trend: "No data" },
  { name: "Ayush / Yoga", totalBeds: 10, occupied: 0, color: "bg-primary", trend: "No data" },
];

export const DepartmentOverview = () => {
  return (
    <div className="animate-fade-in rounded-xl bg-card p-6 shadow-card" style={{ animationDelay: "500ms" }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Department Overview</h3>
        <span className="text-sm text-muted-foreground">Bed Occupancy</span>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
        {departments.map((dept) => {
          const percentage = dept.totalBeds > 0 ? (dept.occupied / dept.totalBeds) * 100 : 0;
          const isHigh = percentage > 80;
          
          return (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{dept.name}</span>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-xs",
                    isHigh ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {dept.trend}
                  </span>
                  <span className="font-semibold">
                    {dept.occupied}/{dept.totalBeds}
                  </span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={cn(
                    "progress-bar-fill",
                    isHigh && "!bg-destructive"
                  )}
                  style={{ 
                    width: `${percentage}%`,
                    background: !isHigh ? `var(--gradient-primary)` : undefined
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
