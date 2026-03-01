
-- Patients table with Indian compliance fields
CREATE TABLE public.patients (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by uuid NOT NULL,
  patient_id text NOT NULL UNIQUE,
  full_name text NOT NULL,
  age integer NOT NULL,
  gender text NOT NULL,
  phone text,
  email text,
  blood_type text,
  department text,
  status text NOT NULL DEFAULT 'Stable',
  avatar_url text,
  address text,
  emergency_contact text,
  aadhaar_number text,
  abha_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view patients" ON public.patients FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can insert patients" ON public.patients FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can update patients" ON public.patients FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete patients" ON public.patients FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Doctors table
CREATE TABLE public.doctors (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  doctor_id text NOT NULL UNIQUE,
  full_name text NOT NULL,
  specialization text,
  department text,
  experience text,
  education text,
  phone text,
  email text,
  rating numeric DEFAULT 0,
  patients_count integer DEFAULT 0,
  availability text DEFAULT 'Available',
  next_slot text,
  consultation_fee numeric DEFAULT 0,
  license_number text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view doctors" ON public.doctors FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins and receptionists can insert doctors" ON public.doctors FOR INSERT WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'doctor'::app_role)
);
CREATE POLICY "Admins can update doctors" ON public.doctors FOR UPDATE USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR (user_id = auth.uid())
);
CREATE POLICY "Admins can delete doctors" ON public.doctors FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Appointments table
CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id uuid REFERENCES public.doctors(id) ON DELETE SET NULL,
  patient_name text NOT NULL,
  doctor_name text NOT NULL,
  appointment_type text DEFAULT 'OPD',
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  duration integer DEFAULT 30,
  status text DEFAULT 'Scheduled',
  is_online boolean DEFAULT false,
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view appointments" ON public.appointments FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can insert appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can update appointments" ON public.appointments FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can delete appointments" ON public.appointments FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Medicines table
CREATE TABLE public.medicines (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  medicine_id text NOT NULL UNIQUE,
  name text NOT NULL,
  generic_name text,
  category text,
  manufacturer text,
  batch_number text,
  expiry_date date,
  quantity integer DEFAULT 0,
  reorder_level integer DEFAULT 10,
  unit_price numeric DEFAULT 0,
  status text DEFAULT 'in-stock',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view medicines" ON public.medicines FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Pharmacists and admins can insert medicines" ON public.medicines FOR INSERT WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'pharmacist'::app_role)
);
CREATE POLICY "Pharmacists and admins can update medicines" ON public.medicines FOR UPDATE USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'pharmacist'::app_role)
);
CREATE POLICY "Admins can delete medicines" ON public.medicines FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_medicines_updated_at BEFORE UPDATE ON public.medicines FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Lab tests table
CREATE TABLE public.lab_tests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id text NOT NULL UNIQUE,
  patient_name text NOT NULL,
  patient_id_ref text,
  test_type text NOT NULL,
  category text,
  requested_by text,
  request_date date NOT NULL DEFAULT CURRENT_DATE,
  sample_collected boolean DEFAULT false,
  status text DEFAULT 'pending',
  priority text DEFAULT 'routine',
  result text,
  completed_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view lab tests" ON public.lab_tests FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can insert lab tests" ON public.lab_tests FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can update lab tests" ON public.lab_tests FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete lab tests" ON public.lab_tests FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_lab_tests_updated_at BEFORE UPDATE ON public.lab_tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Invoices table
CREATE TABLE public.invoices (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id text NOT NULL UNIQUE,
  patient_name text NOT NULL,
  patient_id_ref text,
  invoice_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date,
  items jsonb DEFAULT '[]'::jsonb,
  subtotal numeric DEFAULT 0,
  tax numeric DEFAULT 0,
  total numeric DEFAULT 0,
  paid numeric DEFAULT 0,
  status text DEFAULT 'pending',
  payment_method text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view invoices" ON public.invoices FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can insert invoices" ON public.invoices FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can update invoices" ON public.invoices FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete invoices" ON public.invoices FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Emergency cases table
CREATE TABLE public.emergency_cases (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name text NOT NULL,
  age integer,
  gender text,
  condition text,
  symptoms text[],
  bp text,
  hr integer,
  spo2 integer,
  triage text DEFAULT 'Non-Urgent',
  priority text DEFAULT 'Low',
  wait_time text,
  arrival_time timestamptz DEFAULT now(),
  assigned_to text,
  status text DEFAULT 'Waiting',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.emergency_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view emergency cases" ON public.emergency_cases FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can insert emergency cases" ON public.emergency_cases FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can update emergency cases" ON public.emergency_cases FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Staff can delete emergency cases" ON public.emergency_cases FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_emergency_cases_updated_at BEFORE UPDATE ON public.emergency_cases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
