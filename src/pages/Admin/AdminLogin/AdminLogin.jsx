import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";

import { useAuth } from "../../../context/AuthContext";
import logo from "../../../assets/logos/PANDURANG_INN LOGO.png";

function AdminLogin() {
  const { login, currentUser, resetAdminPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
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
      setError(err?.message?.includes("Firebase isn't connected")
        ? "Firebase isn't connected yet -- see ADMIN_SETUP.md."
        : "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email.trim()) {
      setError("Please enter your email address to reset your password.");
      return;
    }
    
    setIsResetting(true);
    try {
      await resetAdminPassword(email.trim());
      toast.success("Password reset link sent to your email!");
    } catch (err) {
      console.error("Password reset failed:", err);
      setError(err?.message || "Failed to send password reset email.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>

        <div className="admin-login-header">
          <img src={logo} alt="Pandurang Inn" className="admin-login-logo" />
          <span className="admin-login-eyebrow">Admin Access</span>
          <h2>Welcome Back</h2>
          <p>Sign in to manage contact enquiries.</p>
        </div>

        <div className="admin-form-group">
          <label>Email</label>
          <div className="admin-input-wrap">
            <FaEnvelope className="admin-input-icon" />
            <input
              type="email"
              placeholder="admin@panduranginn.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Password</label>
          <div className="admin-input-wrap">
            <FaLock className="admin-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="admin-input-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="admin-forgot-password-wrap">
            <button
              type="button"
              className="admin-forgot-password-btn"
              onClick={handleForgotPassword}
              disabled={isResetting}
            >
              {isResetting ? "Sending link..." : "Forgot Password?"}
            </button>
          </div>
        </div>

        {error && <span className="admin-login-error">{error}</span>}

        <button type="submit" className="admin-login-btn" disabled={isSubmitting}>
          {isSubmitting ? <span className="admin-btn-spinner" /> : "Sign In"}
        </button>

      </form>
    </div>
  );
}

export default AdminLogin;
