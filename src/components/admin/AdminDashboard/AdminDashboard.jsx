import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import "./AdminDashboard.css";

import { useAuth } from "../../../context/AuthContext";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from "../../../api/contactApi";
import { ENQUIRY_TYPES, ENQUIRY_TYPE_LABELS, ENQUIRY_TYPE_LIST } from "../../../constants/enquiryTypes";

const STATUS_FILTERS = ["all", "new", "read", "resolved"];
const TYPE_FILTERS = ["all", ...ENQUIRY_TYPE_LIST];

function formatDate(timestamp) {
  if (!timestamp) return "—";
  // Firestore Timestamp -> JS Date
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function typeLabel(type) {
  return ENQUIRY_TYPE_LABELS[type] || ENQUIRY_TYPE_LABELS[ENQUIRY_TYPES.GENERAL];
}

function AdminDashboard() {
  const { logout } = useAuth();

  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const loadEnquiries = async () => {
    setIsLoading(true);
    try {
      const data = await getEnquiries();
      // Enquiries saved before the "type" field existed won't have one --
      // treat those as General so older data still displays correctly.
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

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
      const matchesType = typeFilter === "all" || enquiry.type === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [enquiries, statusFilter, typeFilter]);

  const statusCounts = useMemo(() => {
    return {
      all: enquiries.length,
      new: enquiries.filter((e) => e.status === "new").length,
      read: enquiries.filter((e) => e.status === "read").length,
      resolved: enquiries.filter((e) => e.status === "resolved").length,
    };
  }, [enquiries]);

  const typeCounts = useMemo(() => {
    const counts = { all: enquiries.length };
    ENQUIRY_TYPE_LIST.forEach((type) => {
      counts[type] = enquiries.filter((e) => e.type === type).length;
    });
    return counts;
  }, [enquiries]);

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
      toast.success("Enquiry deleted");
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
      toast.error("Could not delete enquiry.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <span className="admin-header-eyebrow">Pandurang Inn</span>
          <h1>Contact Enquiries</h1>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <div className="admin-filters">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            className={`admin-filter-btn ${statusFilter === f ? "active" : ""}`}
            onClick={() => setStatusFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="admin-filter-count">{statusCounts[f]}</span>
          </button>
        ))}
        <button className="admin-refresh-btn" onClick={loadEnquiries} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="admin-filters admin-type-filters">
        {TYPE_FILTERS.map((t) => (
          <button
            key={t}
            className={`admin-filter-btn type-btn ${typeFilter === t ? "active" : ""}`}
            onClick={() => setTypeFilter(t)}
          >
            {t === "all" ? "All Types" : typeLabel(t)}
            <span className="admin-filter-count">{typeCounts[t]}</span>
          </button>
        ))}
      </div>

      <div className="admin-list">
        {isLoading && enquiries.length === 0 && (
          <p className="admin-empty">Loading enquiries...</p>
        )}

        {!isLoading && filteredEnquiries.length === 0 && (
          <p className="admin-empty">No enquiries in this view.</p>
        )}

        {filteredEnquiries.map((enquiry) => (
          <div key={enquiry.id} className={`admin-card status-${enquiry.status}`}>
            <div className="admin-card-summary" onClick={() => handleExpand(enquiry)}>
              <div className="admin-card-main">
                <span className={`admin-status-dot status-${enquiry.status}`} />
                <div>
                  <h3>{enquiry.name}</h3>
                  <p className="admin-card-meta">
                    {enquiry.email} &nbsp;•&nbsp; {enquiry.phone}
                  </p>
                </div>
              </div>
              <div className="admin-card-right">
                <span className="admin-card-date">{formatDate(enquiry.createdAt)}</span>
                <span className={`admin-badge type-${enquiry.type}`}>{typeLabel(enquiry.type)}</span>
                <span className={`admin-badge status-${enquiry.status}`}>{enquiry.status}</span>
              </div>
            </div>

            {expandedId === enquiry.id && (
              <div className="admin-card-details">
                <p className="admin-message">{enquiry.message}</p>
                <div className="admin-card-actions">
                  <select
                    value={enquiry.status}
                    onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <a className="admin-action-link" href={`mailto:${enquiry.email}`}>
                    Reply by Email
                  </a>
                  <a className="admin-action-link" href={`tel:${enquiry.phone}`}>
                    Call
                  </a>
                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(enquiry.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;