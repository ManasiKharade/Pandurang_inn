import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "var(--body-font)",
        color: "var(--dark-gray)",
      }}>
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;