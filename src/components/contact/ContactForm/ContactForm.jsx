import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./ContactForm.css";

import { submitEnquiry } from "../../../api/contactApi";
import { ENQUIRY_TYPES, ENQUIRY_TYPE_LABELS, isValidEnquiryType } from "../../../constants/enquiryTypes";

function ContactForm() {
  const [searchParams] = useSearchParams();
  const requestedType = searchParams.get("type");
  const initialType = isValidEnquiryType(requestedType) ? requestedType : ENQUIRY_TYPES.GENERAL;

  const [formData, setFormData] = useState({
    type: initialType,
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Please enter your full name.";
        else if (!/^[A-Za-z ]+$/.test(value)) error = "Only letters and spaces are allowed.";
        else if (value.trim().length < 3) error = "Name must be at least 3 characters.";
        break;

      case "email":
        if (!value.trim()) error = "Please enter your email.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email address.";
        break;

      case "phone":
        if (!value.trim()) error = "Please enter your phone number.";
        else if (!/^[6-9]\d{9}$/.test(value)) error = "Please enter a valid 10-digit mobile number.";
        break;

      case "message":
        if (!value.trim()) error = "Please enter your message.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate every field before submitting
    Object.entries(formData).forEach(([name, value]) => validateField(name, value));

    const hasEmptyField = Object.values(formData).some((value) => !value.trim());
    const hasError = Object.values(errors).some((error) => error);

    if (hasEmptyField || hasError) {
      toast.error("Please fix the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry(formData);
      toast.success("Message sent! Our team will get back to you within 24 hours.");
      setFormData({ type: initialType, name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      toast.error("Something went wrong. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>

      {/* Header */}
      <div className="form-header">
        <span className="form-eyebrow">Send a Message</span>
        <h3>Make a Reservation</h3>
        <p>Fill in the details below and our team will get back to you within 24 hours.</p>
      </div>

      <div className="form-group">
        <label>Enquiry Type *</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="type-select"
        >
          {Object.entries(ENQUIRY_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          placeholder="you@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          placeholder="10-digit mobile number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      {/* Message */}
      <div className="form-group">
        <label>Message *</label>
        <textarea
          rows="4"
          name="message"
          placeholder="Tell us about your enquiry or special requirements..."
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>

      <button type="submit" className="send-btn" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

    </form>
  );
}

export default ContactForm;