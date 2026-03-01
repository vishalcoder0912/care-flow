import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// ─── PATIENTS ───
export interface DBPatient {
  id: string;
  patient_id: string;
  full_name: string;
  age: number;
  gender: string;
  phone: string | null;
  email: string | null;
  blood_type: string | null;
  department: string | null;
  status: string;
  avatar_url: string | null;
  address: string | null;
  emergency_contact: string | null;
  aadhaar_number: string | null;
  abha_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export function usePatients() {
  const [patients, setPatients] = useState<DBPatient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error loading patients", description: error.message, variant: "destructive" });
    } else {
      setPatients(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPatients(); }, [fetchPatients]);

  const addPatient = async (patient: Omit<DBPatient, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("patients").insert(patient).select().single();
    if (error) {
      toast({ title: "Error adding patient", description: error.message, variant: "destructive" });
      return null;
    }
    setPatients((prev) => [data, ...prev]);
    return data;
  };

  const updatePatient = async (id: string, updates: Partial<DBPatient>) => {
    const { data, error } = await supabase.from("patients").update(updates).eq("id", id).select().single();
    if (error) {
      toast({ title: "Error updating patient", description: error.message, variant: "destructive" });
      return null;
    }
    setPatients((prev) => prev.map((p) => (p.id === id ? data : p)));
    return data;
  };

  const deletePatient = async (id: string) => {
    const { error } = await supabase.from("patients").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting patient", description: error.message, variant: "destructive" });
      return false;
    }
    setPatients((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  return { patients, loading, fetchPatients, addPatient, updatePatient, deletePatient };
}

// ─── DOCTORS ───
export interface DBDoctor {
  id: string;
  doctor_id: string;
  user_id: string | null;
  full_name: string;
  specialization: string | null;
  department: string | null;
  experience: string | null;
  education: string | null;
  phone: string | null;
  email: string | null;
  rating: number;
  patients_count: number;
  availability: string;
  next_slot: string | null;
  consultation_fee: number;
  license_number: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<DBDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error loading doctors", description: error.message, variant: "destructive" });
    } else {
      setDoctors(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchDoctors(); }, [fetchDoctors]);

  const addDoctor = async (doctor: Omit<DBDoctor, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("doctors").insert(doctor).select().single();
    if (error) {
      toast({ title: "Error adding doctor", description: error.message, variant: "destructive" });
      return null;
    }
    setDoctors((prev) => [data, ...prev]);
    return data;
  };

  const updateDoctor = async (id: string, updates: Partial<DBDoctor>) => {
    const { data, error } = await supabase.from("doctors").update(updates).eq("id", id).select().single();
    if (error) {
      toast({ title: "Error updating doctor", description: error.message, variant: "destructive" });
      return null;
    }
    setDoctors((prev) => prev.map((d) => (d.id === id ? data : d)));
    return data;
  };

  const deleteDoctor = async (id: string) => {
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting doctor", description: error.message, variant: "destructive" });
      return false;
    }
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    return true;
  };

  return { doctors, loading, fetchDoctors, addDoctor, updateDoctor, deleteDoctor };
}

// ─── APPOINTMENTS ───
export interface DBAppointment {
  id: string;
  patient_id: string | null;
  doctor_id: string | null;
  patient_name: string;
  doctor_name: string;
  appointment_type: string;
  appointment_date: string;
  appointment_time: string;
  duration: number;
  status: string;
  is_online: boolean;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<DBAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: false });
    if (error) {
      toast({ title: "Error loading appointments", description: error.message, variant: "destructive" });
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const addAppointment = async (appt: Omit<DBAppointment, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("appointments").insert(appt).select().single();
    if (error) {
      toast({ title: "Error adding appointment", description: error.message, variant: "destructive" });
      return null;
    }
    setAppointments((prev) => [data, ...prev]);
    return data;
  };

  const updateAppointment = async (id: string, updates: Partial<DBAppointment>) => {
    const { data, error } = await supabase.from("appointments").update(updates).eq("id", id).select().single();
    if (error) {
      toast({ title: "Error updating appointment", description: error.message, variant: "destructive" });
      return null;
    }
    setAppointments((prev) => prev.map((a) => (a.id === id ? data : a)));
    return data;
  };

  return { appointments, loading, fetchAppointments, addAppointment, updateAppointment };
}

// ─── MEDICINES ───
export interface DBMedicine {
  id: string;
  medicine_id: string;
  name: string;
  generic_name: string | null;
  category: string | null;
  manufacturer: string | null;
  batch_number: string | null;
  expiry_date: string | null;
  quantity: number;
  reorder_level: number;
  unit_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useMedicines() {
  const [medicines, setMedicines] = useState<DBMedicine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("medicines")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error loading medicines", description: error.message, variant: "destructive" });
    } else {
      setMedicines(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchMedicines(); }, [fetchMedicines]);

  const addMedicine = async (med: Omit<DBMedicine, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("medicines").insert(med).select().single();
    if (error) {
      toast({ title: "Error adding medicine", description: error.message, variant: "destructive" });
      return null;
    }
    setMedicines((prev) => [data, ...prev]);
    return data;
  };

  const updateMedicine = async (id: string, updates: Partial<DBMedicine>) => {
    const { data, error } = await supabase.from("medicines").update(updates).eq("id", id).select().single();
    if (error) {
      toast({ title: "Error updating medicine", description: error.message, variant: "destructive" });
      return null;
    }
    setMedicines((prev) => prev.map((m) => (m.id === id ? data : m)));
    return data;
  };

  const deleteMedicine = async (id: string) => {
    const { error } = await supabase.from("medicines").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting medicine", description: error.message, variant: "destructive" });
      return false;
    }
    setMedicines((prev) => prev.filter((m) => m.id !== id));
    return true;
  };

  return { medicines, loading, fetchMedicines, addMedicine, updateMedicine, deleteMedicine };
}

// ─── LAB TESTS ───
export interface DBLabTest {
  id: string;
  test_id: string;
  patient_name: string;
  patient_id_ref: string | null;
  test_type: string;
  category: string | null;
  requested_by: string | null;
  request_date: string;
  sample_collected: boolean;
  status: string;
  priority: string;
  result: string | null;
  completed_date: string | null;
  created_at: string;
  updated_at: string;
}

export function useLabTests() {
  const [tests, setTests] = useState<DBLabTest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTests = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lab_tests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error loading lab tests", description: error.message, variant: "destructive" });
    } else {
      setTests(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchTests(); }, [fetchTests]);

  const addTest = async (test: Omit<DBLabTest, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("lab_tests").insert(test).select().single();
    if (error) {
      toast({ title: "Error adding lab test", description: error.message, variant: "destructive" });
      return null;
    }
    setTests((prev) => [data, ...prev]);
    return data;
  };

  const updateTest = async (id: string, updates: Partial<DBLabTest>) => {
    const { data, error } = await supabase.from("lab_tests").update(updates).eq("id", id).select().single();
    if (error) {
      toast({ title: "Error updating lab test", description: error.message, variant: "destructive" });
      return null;
    }
    setTests((prev) => prev.map((t) => (t.id === id ? data : t)));
    return data;
  };

  return { tests, loading, fetchTests, addTest, updateTest };
}

// ─── INVOICES ───
export interface DBInvoice {
  id: string;
  invoice_id: string;
  patient_name: string;
  patient_id_ref: string | null;
  invoice_date: string;
  due_date: string | null;
  items: any;
  subtotal: number;
  tax: number;
  total: number;
  paid: number;
  status: string;
  payment_method: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<DBInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error loading invoices", description: error.message, variant: "destructive" });
    } else {
      setInvoices(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  const addInvoice = async (inv: Omit<DBInvoice, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("invoices").insert(inv).select().single();
    if (error) {
      toast({ title: "Error adding invoice", description: error.message, variant: "destructive" });
      return null;
    }
    setInvoices((prev) => [data, ...prev]);
    return data;
  };

  const updateInvoice = async (id: string, updates: Partial<DBInvoice>) => {
    const { data, error } = await supabase.from("invoices").update(updates).eq("id", id).select().single();
    if (error) {
      toast({ title: "Error updating invoice", description: error.message, variant: "destructive" });
      return null;
    }
    setInvoices((prev) => prev.map((i) => (i.id === id ? data : i)));
    return data;
  };

  return { invoices, loading, fetchInvoices, addInvoice, updateInvoice };
}

// ─── EMERGENCY CASES ───
export interface DBEmergencyCase {
  id: string;
  patient_name: string;
  age: number | null;
  gender: string | null;
  condition: string | null;
  symptoms: string[] | null;
  bp: string | null;
  hr: number | null;
  spo2: number | null;
  triage: string;
  priority: string;
  wait_time: string | null;
  arrival_time: string;
  assigned_to: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useEmergencyCases() {
  const [cases, setCases] = useState<DBEmergencyCase[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("emergency_cases")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error loading emergency cases", description: error.message, variant: "destructive" });
    } else {
      setCases(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchCases(); }, [fetchCases]);

  const addCase = async (ec: Omit<DBEmergencyCase, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("emergency_cases").insert(ec).select().single();
    if (error) {
      toast({ title: "Error adding emergency case", description: error.message, variant: "destructive" });
      return null;
    }
    setCases((prev) => [data, ...prev]);
    return data;
  };

  const updateCase = async (id: string, updates: Partial<DBEmergencyCase>) => {
    const { data, error } = await supabase.from("emergency_cases").update(updates).eq("id", id).select().single();
    if (error) {
      toast({ title: "Error updating emergency case", description: error.message, variant: "destructive" });
      return null;
    }
    setCases((prev) => prev.map((c) => (c.id === id ? data : c)));
    return data;
  };

  const deleteCase = async (id: string) => {
    const { error } = await supabase.from("emergency_cases").delete().eq("id", id);
    if (error) {
      toast({ title: "Error removing case", description: error.message, variant: "destructive" });
      return false;
    }
    setCases((prev) => prev.filter((c) => c.id !== id));
    return true;
  };

  return { cases, loading, fetchCases, addCase, updateCase, deleteCase };
}

// ─── DASHBOARD STATS ───
export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    todayAppointments: 0,
    pendingLabTests: 0,
    totalMedicines: 0,
    lowStockMedicines: 0,
    emergencyCases: 0,
    todayRevenue: 0,
    pendingInvoices: 0,
    completedLabTests: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];

    const [patientsRes, doctorsRes, appointmentsRes, labPendingRes, labCompletedRes, medsRes, lowStockRes, emergencyRes, invoicesRes, revenueRes] = await Promise.all([
      supabase.from("patients").select("id", { count: "exact", head: true }),
      supabase.from("doctors").select("id", { count: "exact", head: true }),
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("appointment_date", today),
      supabase.from("lab_tests").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("lab_tests").select("id", { count: "exact", head: true }).eq("status", "completed"),
      supabase.from("medicines").select("id", { count: "exact", head: true }),
      supabase.from("medicines").select("id", { count: "exact", head: true }).eq("status", "low-stock"),
      supabase.from("emergency_cases").select("id", { count: "exact", head: true }).neq("status", "Discharged"),
      supabase.from("invoices").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("invoices").select("total, paid").eq("status", "paid").gte("invoice_date", today),
    ]);

    const todayRevenue = (revenueRes.data || []).reduce((sum: number, inv: any) => sum + (inv.total || 0), 0);

    setStats({
      totalPatients: patientsRes.count || 0,
      totalDoctors: doctorsRes.count || 0,
      todayAppointments: appointmentsRes.count || 0,
      pendingLabTests: labPendingRes.count || 0,
      completedLabTests: labCompletedRes.count || 0,
      totalMedicines: medsRes.count || 0,
      lowStockMedicines: lowStockRes.count || 0,
      emergencyCases: emergencyRes.count || 0,
      pendingInvoices: invoicesRes.count || 0,
      todayRevenue,
    });
    setLoading(false);
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { stats, loading, fetchStats };
}
