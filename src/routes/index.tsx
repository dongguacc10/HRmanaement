import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import EnterpriseLogin from '../pages/EnterpriseLoginPage';
import AdminLogin from '../pages/AdminLoginPage';
import EnterprisePortal from '../pages/enterprise/EnterprisePortal';
import AdminPortal from '../pages/admin/AdminPortal';
import CheckInPortal from '../pages/check-in/CheckInPortal';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/enterprise" element={<EnterpriseLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/check-in/*" element={<CheckInPortal />} />
      <Route path="/enterprise" element={<Navigate to="/enterprise/dashboard" replace />} />
      <Route path="/enterprise/*" element={<EnterprisePortal />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/*" element={<AdminPortal />} />
    </Routes>
  );
}