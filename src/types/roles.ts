export type AppRole = "admin" | "doctor" | "nurse" | "patient" | "receptionist" | "lab_tech" | "pharmacist" | "accountant";

export interface RoleConfig {
  label: string;
  description: string;
  color: string;
  bgColor: string;
}

export const ROLE_CONFIGS: Record<AppRole, RoleConfig> = {
  admin: { label: "Administrator", description: "Full system access", color: "text-red-300", bgColor: "bg-red-500/20" },
  doctor: { label: "Doctor", description: "Clinical management", color: "text-blue-300", bgColor: "bg-blue-500/20" },
  nurse: { label: "Nurse", description: "Patient care", color: "text-green-300", bgColor: "bg-green-500/20" },
  patient: { label: "Patient", description: "Health portal", color: "text-purple-300", bgColor: "bg-purple-500/20" },
  receptionist: { label: "Receptionist", description: "Front desk ops", color: "text-amber-300", bgColor: "bg-amber-500/20" },
  lab_tech: { label: "Lab Technician", description: "Lab operations", color: "text-cyan-300", bgColor: "bg-cyan-500/20" },
  pharmacist: { label: "Pharmacist", description: "Pharmacy management", color: "text-emerald-300", bgColor: "bg-emerald-500/20" },
  accountant: { label: "Accountant", description: "Financial management", color: "text-orange-300", bgColor: "bg-orange-500/20" },
};

export const DEMO_CREDENTIALS: { role: AppRole; email: string; password: string }[] = [
  { role: "admin", email: "admin@medicare.com", password: "Admin@123456" },
  { role: "doctor", email: "doctor@medicare.com", password: "Doctor@123456" },
  { role: "nurse", email: "nurse@medicare.com", password: "Nurse@123456" },
  { role: "patient", email: "patient@medicare.com", password: "Patient@123456" },
  { role: "receptionist", email: "receptionist@medicare.com", password: "Reception@123456" },
  { role: "lab_tech", email: "labtech@medicare.com", password: "LabTech@123456" },
  { role: "pharmacist", email: "pharmacist@medicare.com", password: "Pharma@123456" },
  { role: "accountant", email: "accountant@medicare.com", password: "Account@123456" },
];
