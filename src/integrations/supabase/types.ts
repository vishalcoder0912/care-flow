export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          appointment_type: string | null
          created_at: string
          created_by: string | null
          doctor_id: string | null
          doctor_name: string
          duration: number | null
          id: string
          is_online: boolean | null
          notes: string | null
          patient_id: string | null
          patient_name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          appointment_type?: string | null
          created_at?: string
          created_by?: string | null
          doctor_id?: string | null
          doctor_name: string
          duration?: number | null
          id?: string
          is_online?: boolean | null
          notes?: string | null
          patient_id?: string | null
          patient_name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          appointment_type?: string | null
          created_at?: string
          created_by?: string | null
          doctor_id?: string | null
          doctor_name?: string
          duration?: number | null
          id?: string
          is_online?: boolean | null
          notes?: string | null
          patient_id?: string | null
          patient_name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_logs: {
        Row: {
          check_in: string
          check_out: string | null
          created_at: string
          id: string
          notes: string | null
          total_hours: number | null
          user_id: string
        }
        Insert: {
          check_in?: string
          check_out?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          total_hours?: number | null
          user_id: string
        }
        Update: {
          check_in?: string
          check_out?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          total_hours?: number | null
          user_id?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          availability: string | null
          avatar_url: string | null
          consultation_fee: number | null
          created_at: string
          department: string | null
          doctor_id: string
          education: string | null
          email: string | null
          experience: string | null
          full_name: string
          id: string
          license_number: string | null
          next_slot: string | null
          patients_count: number | null
          phone: string | null
          rating: number | null
          specialization: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          availability?: string | null
          avatar_url?: string | null
          consultation_fee?: number | null
          created_at?: string
          department?: string | null
          doctor_id: string
          education?: string | null
          email?: string | null
          experience?: string | null
          full_name: string
          id?: string
          license_number?: string | null
          next_slot?: string | null
          patients_count?: number | null
          phone?: string | null
          rating?: number | null
          specialization?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          availability?: string | null
          avatar_url?: string | null
          consultation_fee?: number | null
          created_at?: string
          department?: string | null
          doctor_id?: string
          education?: string | null
          email?: string | null
          experience?: string | null
          full_name?: string
          id?: string
          license_number?: string | null
          next_slot?: string | null
          patients_count?: number | null
          phone?: string | null
          rating?: number | null
          specialization?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      emergency_cases: {
        Row: {
          age: number | null
          arrival_time: string | null
          assigned_to: string | null
          bp: string | null
          condition: string | null
          created_at: string
          gender: string | null
          hr: number | null
          id: string
          patient_name: string
          priority: string | null
          spo2: number | null
          status: string | null
          symptoms: string[] | null
          triage: string | null
          updated_at: string
          wait_time: string | null
        }
        Insert: {
          age?: number | null
          arrival_time?: string | null
          assigned_to?: string | null
          bp?: string | null
          condition?: string | null
          created_at?: string
          gender?: string | null
          hr?: number | null
          id?: string
          patient_name: string
          priority?: string | null
          spo2?: number | null
          status?: string | null
          symptoms?: string[] | null
          triage?: string | null
          updated_at?: string
          wait_time?: string | null
        }
        Update: {
          age?: number | null
          arrival_time?: string | null
          assigned_to?: string | null
          bp?: string | null
          condition?: string | null
          created_at?: string
          gender?: string | null
          hr?: number | null
          id?: string
          patient_name?: string
          priority?: string | null
          spo2?: number | null
          status?: string | null
          symptoms?: string[] | null
          triage?: string | null
          updated_at?: string
          wait_time?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string
          created_by: string | null
          due_date: string | null
          id: string
          invoice_date: string
          invoice_id: string
          items: Json | null
          paid: number | null
          patient_id_ref: string | null
          patient_name: string
          payment_method: string | null
          status: string | null
          subtotal: number | null
          tax: number | null
          total: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_id: string
          items?: Json | null
          paid?: number | null
          patient_id_ref?: string | null
          patient_name: string
          payment_method?: string | null
          status?: string | null
          subtotal?: number | null
          tax?: number | null
          total?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_id?: string
          items?: Json | null
          paid?: number | null
          patient_id_ref?: string | null
          patient_name?: string
          payment_method?: string | null
          status?: string | null
          subtotal?: number | null
          tax?: number | null
          total?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      lab_tests: {
        Row: {
          category: string | null
          completed_date: string | null
          created_at: string
          id: string
          patient_id_ref: string | null
          patient_name: string
          priority: string | null
          request_date: string
          requested_by: string | null
          result: string | null
          sample_collected: boolean | null
          status: string | null
          test_id: string
          test_type: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          completed_date?: string | null
          created_at?: string
          id?: string
          patient_id_ref?: string | null
          patient_name: string
          priority?: string | null
          request_date?: string
          requested_by?: string | null
          result?: string | null
          sample_collected?: boolean | null
          status?: string | null
          test_id: string
          test_type: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          completed_date?: string | null
          created_at?: string
          id?: string
          patient_id_ref?: string | null
          patient_name?: string
          priority?: string | null
          request_date?: string
          requested_by?: string | null
          result?: string | null
          sample_collected?: boolean | null
          status?: string | null
          test_id?: string
          test_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      medicines: {
        Row: {
          batch_number: string | null
          category: string | null
          created_at: string
          expiry_date: string | null
          generic_name: string | null
          id: string
          manufacturer: string | null
          medicine_id: string
          name: string
          quantity: number | null
          reorder_level: number | null
          status: string | null
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          batch_number?: string | null
          category?: string | null
          created_at?: string
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          manufacturer?: string | null
          medicine_id: string
          name: string
          quantity?: number | null
          reorder_level?: number | null
          status?: string | null
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          batch_number?: string | null
          category?: string | null
          created_at?: string
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          manufacturer?: string | null
          medicine_id?: string
          name?: string
          quantity?: number | null
          reorder_level?: number | null
          status?: string | null
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          aadhaar_number: string | null
          abha_id: string | null
          address: string | null
          age: number
          avatar_url: string | null
          blood_type: string | null
          created_at: string
          created_by: string
          department: string | null
          email: string | null
          emergency_contact: string | null
          full_name: string
          gender: string
          id: string
          patient_id: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          aadhaar_number?: string | null
          abha_id?: string | null
          address?: string | null
          age: number
          avatar_url?: string | null
          blood_type?: string | null
          created_at?: string
          created_by: string
          department?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name: string
          gender: string
          id?: string
          patient_id: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          aadhaar_number?: string | null
          abha_id?: string | null
          address?: string | null
          age?: number
          avatar_url?: string | null
          blood_type?: string | null
          created_at?: string
          created_by?: string
          department?: string | null
          email?: string | null
          emergency_contact?: string | null
          full_name?: string
          gender?: string
          id?: string
          patient_id?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          department: string | null
          full_name: string | null
          id: string
          license_number: string | null
          phone: string | null
          specialty: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          license_number?: string | null
          phone?: string | null
          specialty?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          license_number?: string | null
          phone?: string | null
          specialty?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "doctor"
        | "nurse"
        | "patient"
        | "receptionist"
        | "lab_tech"
        | "pharmacist"
        | "accountant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "doctor",
        "nurse",
        "patient",
        "receptionist",
        "lab_tech",
        "pharmacist",
        "accountant",
      ],
    },
  },
} as const
