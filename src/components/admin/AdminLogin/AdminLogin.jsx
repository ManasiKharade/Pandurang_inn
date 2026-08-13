import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./AdminLogin.css";

import { useAuth } from "../../../context/AuthContext";

function AdminLogin() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/admin/dashboard";

  if (currentUser) {
    navigate("/admin/dashboard", { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Admin login failed:", err);
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="component-admin-login-page">
      <form className="component-admin-login-card" onSubmit={handleSubmit}>
        <div className="component-admin-login-header">
          <span className="component-admin-login-eyebrow">Pandurang Inn</span>
          <h2>Admin Login</h2>
          <p>Sign in to manage contact enquiries.</p>
        </div>

        <div className="component-admin-form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@panduranginn.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="component-admin-form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && <span className="component-admin-login-error">{error}</span>}

        <button type="submit" className="component-admin-login-btn" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;