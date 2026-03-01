import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Phone, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddPatientDialog } from "@/components/patients/AddPatientDialog";
import { EditPatientDialog } from "@/components/patients/EditPatientDialog";
import { ViewPatientDialog } from "@/components/patients/ViewPatientDialog";
import { DeletePatientDialog } from "@/components/patients/DeletePatientDialog";
import { toast } from "@/hooks/use-toast";
import { usePatients, type DBPatient } from "@/hooks/useSupabaseData";
import { useAuth } from "@/contexts/AuthContext";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Discharged": return "bg-success/10 text-success border-success/20";
    case "In Treatment": return "bg-warning/10 text-warning border-warning/20";
    case "Critical": return "bg-destructive/10 text-destructive border-destructive/20";
    case "Stable": return "bg-info/10 text-info border-info/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const Patients = () => {
  const { user } = useAuth();
  const { patients, loading, addPatient, updatePatient, deletePatient } = usePatients();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [viewPatient, setViewPatient] = useState<DBPatient | null>(null);
  const [editPatient, setEditPatient] = useState<DBPatient | null>(null);
  const [deletePatientData, setDeletePatientData] = useState<DBPatient | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAddPatient = async (newPatient: any) => {
    await addPatient({
      created_by: user?.id || "",
      patient_id: `P-${String(Date.now()).slice(-6)}`,
      full_name: newPatient.name,
      age: newPatient.age,
      gender: newPatient.gender,
      phone: newPatient.phone,
      email: newPatient.email,
      blood_type: newPatient.bloodType,
      department: newPatient.department,
      status: newPatient.status,
      address: newPatient.address || null,
      emergency_contact: newPatient.emergencyContact || null,
      aadhaar_number: newPatient.aadhaarNumber || null,
      abha_id: newPatient.abhaId || null,
      avatar_url: null,
    });
  };

  const handleEditPatient = async (updated: any) => {
    await updatePatient(updated.id, {
      full_name: updated.name,
      age: updated.age,
      gender: updated.gender,
      phone: updated.phone,
      email: updated.email,
      blood_type: updated.bloodType,
      department: updated.department,
      status: updated.status,
    });
  };

  const handleDeletePatient = async () => {
    if (deletePatientData) {
      await deletePatient(deletePatientData.id);
      setDeletePatientData(null);
    }
  };

  // Map DBPatient to legacy Patient shape for dialogs
  const toLegacy = (p: DBPatient) => ({
    id: p.id,
    name: p.full_name,
    age: p.age,
    gender: p.gender,
    phone: p.phone || "",
    email: p.email || "",
    bloodType: p.blood_type || "",
    department: p.department || "",
    status: p.status,
    statusType: p.status === "Stable" ? "info" : p.status === "In Treatment" ? "warning" : p.status === "Critical" ? "danger" : "success",
    lastVisit: new Date(p.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    avatar: p.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.full_name}`,
  });

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patient_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || (p.department || "").toLowerCase() === departmentFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-fade-in">
          <h1 className="font-display text-2xl font-bold md:text-3xl">Patients</h1>
          <p className="mt-1 text-muted-foreground">Manage and view all patient records ({patients.length} total)</p>
        </div>
        <AddPatientDialog onAdd={handleAddPatient} />
      </div>

      <div className="animate-fade-in flex flex-col gap-4 rounded-xl bg-card p-4 shadow-card sm:flex-row" style={{ animationDelay: "100ms" }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search patients by name or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="oncology">Oncology</SelectItem>
              <SelectItem value="general medicine">General Medicine</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="treatment">In Treatment</SelectItem>
              <SelectItem value="discharged">Discharged</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => { setSearchQuery(""); setDepartmentFilter("all"); setStatusFilter("all"); }}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-card p-12 text-center shadow-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No patients found</h3>
          <p className="mt-1 text-muted-foreground">Add your first patient or adjust your filters</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPatients.map((patient, index) => (
            <div key={patient.id} className="animate-fade-in rounded-xl bg-card p-5 shadow-card transition-all hover:shadow-card-hover" style={{ animationDelay: `${150 + index * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                    <AvatarImage src={patient.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.full_name}`} />
                    <AvatarFallback>{patient.full_name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{patient.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.patient_id} • {patient.age} yrs, {patient.gender}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setViewPatient(patient); setViewDialogOpen(true); }}><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setEditPatient(patient); setEditDialogOpen(true); }}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => { setDeletePatientData(patient); setDeleteDialogOpen(true); }}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Department</span>
                  <span className="text-sm font-medium">{patient.department || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Blood Type</span>
                  <Badge variant="outline" className="font-mono">{patient.blood_type || "—"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className={getStatusStyles(patient.status)}>{patient.status}</Badge>
                </div>
              </div>
              <div className="mt-4 flex gap-2 border-t border-border pt-4">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => toast({ title: "Calling Patient", description: `Initiating call to ${patient.phone}` })}>
                  <Phone className="h-3.5 w-3.5" />Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => toast({ title: "Email Opened", description: `Composing email to ${patient.email}` })}>
                  <Mail className="h-3.5 w-3.5" />Email
                </Button>
                <Button size="sm" className="flex-1" onClick={() => { setViewPatient(patient); setViewDialogOpen(true); }}>View Record</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ViewPatientDialog patient={viewPatient ? toLegacy(viewPatient) : null} open={viewDialogOpen} onOpenChange={setViewDialogOpen} onEdit={() => { setViewDialogOpen(false); if (viewPatient) { setEditPatient(viewPatient); setEditDialogOpen(true); } }} />
      <EditPatientDialog patient={editPatient ? toLegacy(editPatient) : null} open={editDialogOpen} onOpenChange={setEditDialogOpen} onSave={handleEditPatient} />
      <DeletePatientDialog patientName={deletePatientData?.full_name || ""} patientId={deletePatientData?.patient_id || ""} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={handleDeletePatient} />
    </div>
  );
};

export default Patients;
