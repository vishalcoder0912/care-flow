
-- Add new roles to the enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'receptionist';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'lab_tech';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'pharmacist';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'accountant';

-- Create attendance_logs table for doctor check-in/check-out
CREATE TABLE public.attendance_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  check_in TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  check_out TIMESTAMP WITH TIME ZONE,
  total_hours NUMERIC(5,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own attendance
CREATE POLICY "Users can view own attendance"
  ON public.attendance_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own attendance (check-in)
CREATE POLICY "Users can check in"
  ON public.attendance_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own attendance (check-out)
CREATE POLICY "Users can check out"
  ON public.attendance_logs FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can view all attendance
CREATE POLICY "Admins can view all attendance"
  ON public.attendance_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage all attendance
CREATE POLICY "Admins can manage all attendance"
  ON public.attendance_logs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for attendance
ALTER PUBLICATION supabase_realtime ADD TABLE public.attendance_logs;
