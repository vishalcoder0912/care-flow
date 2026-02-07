import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoleBasedLayout } from "@/components/layout/RoleBasedLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Departments from "./pages/Departments";
import Emergency from "./pages/Emergency";
import Pharmacy from "./pages/Pharmacy";
import Laboratory from "./pages/Laboratory";
import Reports from "./pages/Reports";
import Billing from "./pages/Billing";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import type { AppRole } from "@/types/roles";

const queryClient = new QueryClient();

const allRoles: AppRole[] = ["admin", "doctor", "nurse", "patient", "receptionist", "lab_tech", "pharmacist", "accountant"];

const ProtectedPage = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: AppRole[] }) => (
  <ProtectedRoute allowedRoles={allowedRoles}>
    <RoleBasedLayout>{children}</RoleBasedLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/" element={<ProtectedPage allowedRoles={allRoles}><Dashboard /></ProtectedPage>} />
            <Route path="/patients" element={<ProtectedPage allowedRoles={["admin", "doctor", "nurse", "receptionist"]}><Patients /></ProtectedPage>} />
            <Route path="/doctors" element={<ProtectedPage allowedRoles={["admin", "nurse", "patient", "receptionist"]}><Doctors /></ProtectedPage>} />
            <Route path="/appointments" element={<ProtectedPage allowedRoles={["admin", "doctor", "nurse", "patient", "receptionist"]}><Appointments /></ProtectedPage>} />
            <Route path="/departments" element={<ProtectedPage allowedRoles={["admin", "doctor", "nurse"]}><Departments /></ProtectedPage>} />
            <Route path="/emergency" element={<ProtectedPage allowedRoles={["admin", "doctor", "nurse", "receptionist"]}><Emergency /></ProtectedPage>} />
            <Route path="/pharmacy" element={<ProtectedPage allowedRoles={["admin", "doctor", "nurse", "patient", "pharmacist"]}><Pharmacy /></ProtectedPage>} />
            <Route path="/laboratory" element={<ProtectedPage allowedRoles={["admin", "doctor", "nurse", "patient", "lab_tech"]}><Laboratory /></ProtectedPage>} />
            <Route path="/reports" element={<ProtectedPage allowedRoles={["admin", "doctor", "accountant"]}><Reports /></ProtectedPage>} />
            <Route path="/billing" element={<ProtectedPage allowedRoles={["admin", "patient", "accountant", "receptionist"]}><Billing /></ProtectedPage>} />
            <Route path="/attendance" element={<ProtectedPage allowedRoles={["admin"]}><Attendance /></ProtectedPage>} />
            <Route path="/settings" element={<ProtectedPage allowedRoles={allRoles}><Settings /></ProtectedPage>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
