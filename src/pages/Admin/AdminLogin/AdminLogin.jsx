import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./AdminLogin.css";
import { useAuth } from "../../../context/AuthContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { login, currentUser, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If the admin is already logged in, send them to the dashboard
  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [currentUser, loading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(cleanEmail, password);

      toast.success("Login successful");

      // Give the logged-in admin access to the dashboard
      navigate("/admin/dashboard", { replace: true });
    } catch (loginError) {
      console.error("Login failed:", loginError);

      const errorMessage =
        loginError?.message || "Invalid email or password.";

      setError(errorMessage);
      toast.error("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-card">
          <p className="admin-login-loading">Checking login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-login-eyebrow">Pandurang Inn</span>
          <h1>Admin Login</h1>
          <p>Sign in to manage guest enquiries.</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@panduranginn.com"
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p className="admin-login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="admin-login-footer">
          Authorized administrators only
        </p>
      </section>
    </main>
  );
}

export default AdminLogin;