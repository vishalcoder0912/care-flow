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
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "patient"]}>
                  <RoleBasedLayout>
                    <Dashboard />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse"]}>
                  <RoleBasedLayout>
                    <Patients />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctors"
              element={
                <ProtectedRoute allowedRoles={["admin", "nurse", "patient"]}>
                  <RoleBasedLayout>
                    <Doctors />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "patient"]}>
                  <RoleBasedLayout>
                    <Appointments />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/departments"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse"]}>
                  <RoleBasedLayout>
                    <Departments />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse"]}>
                  <RoleBasedLayout>
                    <Emergency />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pharmacy"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "patient"]}>
                  <RoleBasedLayout>
                    <Pharmacy />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/laboratory"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "patient"]}>
                  <RoleBasedLayout>
                    <Laboratory />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                  <RoleBasedLayout>
                    <Reports />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute allowedRoles={["admin", "patient"]}>
                  <RoleBasedLayout>
                    <Billing />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["admin", "doctor", "nurse", "patient"]}>
                  <RoleBasedLayout>
                    <Settings />
                  </RoleBasedLayout>
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
