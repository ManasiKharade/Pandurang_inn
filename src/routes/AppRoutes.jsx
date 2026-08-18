import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import NearbyPlaceDetail from "../pages/NearbyPlaceDetail/NearbyPlaceDetail";
import AdminLogin from "../pages/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import ProtectedRoute from "../components/admin/ProtectedRoute/ProtectedRoute";

// Redirects to a home section while preserving any query string --
// used by /contact so a deep link like /contact?type=room keeps its
// enquiry type when it lands on /?type=room#contact.
function SectionRedirect({ hash }) {
  const location = useLocation();
  return <Navigate to={`/${location.search}${hash}`} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/place/:id" element={<NearbyPlaceDetail />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

      {/* All section routes redirect to home with the corresponding hash */}
      <Route path="/about" element={<Navigate to="/#about" replace />} />

      <Route path="/rooms" element={<Navigate to="/#rooms" replace />} />

      <Route path="/services" element={<Navigate to="/#services" replace />} />
      <Route path="/nearby-places" element={<Navigate to="/#nearby" replace />} />
      <Route path="/contact" element={<SectionRedirect hash="#contact" />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;