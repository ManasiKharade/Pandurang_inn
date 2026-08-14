import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiSearch,
  FiX,
  FiTrash2,
  FiMail,
  FiPhone,
  FiAlertCircle,
  FiRefreshCw,
  FiDownload,
  FiLogOut,
  FiInbox,
  FiClock,
  FiCalendar,
  FiTrendingUp,
  FiChevronDown,
  FiChevronUp,
  FiSettings,
  FiLock,
} from "react-icons/fi";
import { HiOutlineMailOpen } from "react-icons/hi";

import "./AdminDashboard.css";
import { useAuth } from "../../../context/AuthContext";
import logo from "../../../assets/logos/PANDURANG_INN LOGO.png";
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../../../api/contactApi";
import {
  ENQUIRY_TYPES,
  ENQUIRY_TYPE_LABELS,
} from "../../../constants/enquiryTypes";

const STATUS_FILTERS = ["all", "new", "read", "resolved"];

function formatDate(timestamp) {
  if (!timestamp) return "—";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function relativeTime(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const diff = (Date.now() - date.getTime()) / 1000; // seconds
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
  return formatDate(timestamp);
}

function typeLabel(type) {
  return ENQUIRY_TYPE_LABELS[type] || ENQUIRY_TYPE_LABELS[ENQUIRY_TYPES.GENERAL];
}

function isToday(timestamp) {
  if (!timestamp) return false;
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isThisWeek(timestamp) {
  if (!timestamp) return false;
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return date >= weekAgo;
}

function exportToCSV(enquiries) {
  const headers = ["Name", "Email", "Phone", "Type", "Status", "Message", "Received"];
  const rows = enquiries.map((e) => [
    e.name,
    e.email,
    e.phone,
    typeLabel(e.type),
    e.status,
    `"${(e.message || "").replace(/"/g, '""')}"`,
    formatDate(e.createdAt),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `enquiries-${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast.success("Enquiries exported to CSV");
}

function AdminDashboard() {
  const { currentUser, logout, updateAdminPassword } = useAuth();

  const [activeTab, setActiveTab] = useState("enquiries");
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // Settings State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const loadEnquiries = async () => {
    setIsLoading(true);
    try {
      const data = await getEnquiries();
      const normalized = data.map((enquiry) => ({
        ...enquiry,
        type: enquiry.type || ENQUIRY_TYPES.GENERAL,
      }));
      setEnquiries(normalized);
    } catch (error) {
      console.error("Failed to load enquiries:", error);
      toast.error("Could not load enquiries. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  // ===== Stats =====
  const stats = useMemo(() => {
    return {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === "new").length,
      today: enquiries.filter((e) => isToday(e.createdAt)).length,
      thisWeek: enquiries.filter((e) => isThisWeek(e.createdAt)).length,
    };
  }, [enquiries]);

  // ===== Filter + Search =====
  const filteredEnquiries = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return enquiries.filter((enquiry) => {
      const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
      const matchesType = typeFilter === "all" || enquiry.type === typeFilter;
      const matchesSearch =
        searchQuery === "" ||
        enquiry.name.toLowerCase().includes(searchLower) ||
        enquiry.email.toLowerCase().includes(searchLower) ||
        enquiry.phone.includes(searchQuery) ||
        enquiry.message.toLowerCase().includes(searchLower);
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [enquiries, statusFilter, typeFilter, searchQuery]);

  const statusCounts = useMemo(() => ({
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    read: enquiries.filter((e) => e.status === "read").length,
    resolved: enquiries.filter((e) => e.status === "resolved").length,
  }), [enquiries]);

  // ===== Handlers =====
  const handleExpand = async (enquiry) => {
    const nowExpanded = expandedId === enquiry.id ? null : enquiry.id;
    setExpandedId(nowExpanded);

    if (nowExpanded && enquiry.status === "new") {
      try {
        await updateEnquiryStatus(enquiry.id, "read");
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiry.id ? { ...e, status: "read" } : e))
        );
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateEnquiryStatus(id, status);
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      toast.success(`Marked as ${status}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Could not update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (expandedId === id) setExpandedId(null);
      toast.success("Enquiry deleted");
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
      toast.error("Could not delete enquiry.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updateAdminPassword(newPassword);
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error(error.message || "Failed to update password.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-title-area">
          <img src={logo} alt="Pandurang Inn" className="admin-dashboard-logo" />
          <div>
            <span className="admin-header-eyebrow">Pandurang Inn</span>
            <h1>{activeTab === "enquiries" ? "Enquiries Dashboard" : "Admin Settings"}</h1>
            <p className="admin-header-sub">
              {activeTab === "enquiries" ? "Manage and respond to guest enquiries" : "Manage your admin account preferences"}
            </p>
          </div>
        </div>
        <div className="admin-header-actions">
          {activeTab === "enquiries" ? (
            <button
              className="admin-btn admin-btn-secondary"
              onClick={() => setActiveTab("settings")}
            >
              <FiSettings />
              <span>Settings</span>
            </button>
          ) : (
            <button
              className="admin-btn admin-btn-secondary"
              onClick={() => setActiveTab("enquiries")}
            >
              <FiInbox />
              <span>Enquiries</span>
            </button>
          )}
          <button
            className="admin-btn admin-btn-secondary"
            onClick={loadEnquiries}
            disabled={isLoading}
          >
            <FiRefreshCw className={isLoading ? "spin" : ""} />
            <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <button className="admin-btn admin-btn-outline" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {activeTab === "settings" ? (
        <div className="admin-content admin-settings-content">
          <div className="admin-settings-card">
            <div className="admin-settings-card-header">
              <h3>Change Password</h3>
              <p>Update your admin account password here.</p>
            </div>
            <form onSubmit={handleUpdatePassword} className="admin-settings-form">
              <div className="admin-form-group">
                <label>New Password</label>
                <div className="admin-input-wrap">
                  <FiLock className="admin-input-icon" />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Confirm Password</label>
                <div className="admin-input-wrap">
                  <FiLock className="admin-input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="admin-btn admin-btn-primary"
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-content">
          {/* Stat Cards */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-total">
                <FiInbox />
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-label">Total Enquiries</span>
                <h3>{stats.total}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-new">
                <HiOutlineMailOpen />
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-label">New</span>
                <h3>{stats.new}</h3>
                {stats.new > 0 && <span className="admin-stat-pulse">Action needed</span>}
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-today">
                <FiClock />
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-label">Today</span>
                <h3>{stats.today}</h3>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon admin-stat-icon-week">
                <FiTrendingUp />
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-label">This Week</span>
                <h3>{stats.thisWeek}</h3>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="admin-filters-bar">
            <div className="admin-status-tabs">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  className={`admin-status-tab ${statusFilter === f ? "active" : ""}`}
                  onClick={() => setStatusFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  <span className="admin-tab-count">{statusCounts[f]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search + Type Filter */}
          <div className="admin-search-row">
            <div className="admin-search-box">
              <FiSearch className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="admin-search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  <FiX />
                </button>
              )}
            </div>

            <select
              className="admin-type-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value={ENQUIRY_TYPES.GENERAL}>General</option>
              <option value={ENQUIRY_TYPES.ROOM}>Room Booking</option>
              <option value={ENQUIRY_TYPES.DORMITORY}>Dormitory</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="admin-results-info">
            <span>
              Showing <strong>{filteredEnquiries.length}</strong> of {enquiries.length} enquiries
            </span>
          </div>

          {/* Enquiry List */}
          <div className="admin-list">
            {isLoading && enquiries.length === 0 && (
              <div className="admin-empty">
                <FiRefreshCw className="admin-empty-icon spin" />
                <p>Loading enquiries...</p>
              </div>
            )}

            {!isLoading && filteredEnquiries.length === 0 && (
              <div className="admin-empty">
                <FiAlertCircle className="admin-empty-icon" />
                <h3>No enquiries found</h3>
                <p>Try adjusting your filters or search query</p>
              </div>
            )}

            {filteredEnquiries.map((enquiry) => {
              const isExpanded = expandedId === enquiry.id;
              return (
                <div
                  key={enquiry.id}
                  className={`admin-card status-${enquiry.status} ${isExpanded ? "expanded" : ""}`}
                >
                  <div
                    className="admin-card-summary"
                    onClick={() => handleExpand(enquiry)}
                  >
                    <div className="admin-card-left">
                      <span className={`admin-status-dot status-${enquiry.status}`} />
                      <div>
                        <h3 className="admin-card-name">
                          {enquiry.name}
                          {enquiry.status === "new" && (
                            <span className="admin-new-indicator">NEW</span>
                          )}
                        </h3>
                        <p className="admin-card-meta">
                          {enquiry.email} • {enquiry.phone}
                        </p>
                      </div>
                    </div>

                    <div className="admin-card-right">
                      <div className="admin-card-info">
                        <span className={`admin-badge type-${enquiry.type}`}>
                          {typeLabel(enquiry.type)}
                        </span>
                        <span className={`admin-badge status-${enquiry.status}`}>
                          {enquiry.status}
                        </span>
                      </div>
                      <span className="admin-card-time" title={formatDate(enquiry.createdAt)}>
                        {relativeTime(enquiry.createdAt)}
                      </span>
                      <span className="admin-expand-icon">
                        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="admin-card-details">
                      <div className="admin-message-box">
                        <span className="admin-message-label">Message</span>
                        <p className="admin-message-text">{enquiry.message}</p>
                      </div>

                      <div className="admin-card-footer">
                        <div className="admin-status-control">
                          <label>Status:</label>
                          <select
                            value={enquiry.status}
                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                            className={`admin-status-select status-${enquiry.status}`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>

                        <div className="admin-card-actions">
                          <a
                            href={`mailto:${enquiry.email}`}
                            className="admin-btn admin-btn-primary"
                          >
                            <FiMail /> Reply by Email
                          </a>
                          <a
                            href={`tel:${enquiry.phone}`}
                            className="admin-btn admin-btn-secondary"
                          >
                            <FiPhone /> Call
                          </a>
                          <button
                            className="admin-btn admin-btn-danger"
                            onClick={() => handleDelete(enquiry.id)}
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;