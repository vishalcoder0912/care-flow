import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DoctorDashboard from "@/components/dashboard/DoctorDashboard";
import NurseDashboard from "@/components/dashboard/NurseDashboard";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import ReceptionistDashboard from "@/components/dashboard/ReceptionistDashboard";
import LabTechDashboard from "@/components/dashboard/LabTechDashboard";
import PharmacistDashboard from "@/components/dashboard/PharmacistDashboard";
import AccountantDashboard from "@/components/dashboard/AccountantDashboard";

const Dashboard = () => {
  const { role } = useAuth();

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "nurse":
      return <NurseDashboard />;
    case "patient":
      return <PatientDashboard />;
    case "receptionist":
      return <ReceptionistDashboard />;
    case "lab_tech":
      return <LabTechDashboard />;
    case "pharmacist":
      return <PharmacistDashboard />;
    case "accountant":
      return <AccountantDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default Dashboard;
