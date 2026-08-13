import "./ContactInfo.css";
import contact from "../../../data/contact";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaComments
} from "react-icons/fa";

const infoItems = [
  { icon: <FaMapMarkerAlt />, label: "Address", value: contact.address },
  { icon: <FaPhoneAlt />,     label: "Phone",   value: contact.phone },
  { icon: <FaEnvelope />,     label: "Email",   value: contact.email },
  { icon: <FaClock />,        label: "Reception", value: contact.reception },
  { icon: <FaComments />,     label: "Response Time", value: contact.response },
];

function ContactInfo() {
  return (
    <div className="contact-info">

      <span className="contact-info-eyebrow">Pandurang Inn</span>

      <h2>Get in Touch</h2>

      <p className="contact-description">
        Whether you have a booking enquiry, need assistance, or want
        more information — our team is always ready to help.
      </p>

      <div className="info-list">
        {infoItems.map((item, i) => (
          <div className="info-card" key={i}>
            <div className="info-icon">{item.icon}</div>
            <div>
              <h4>{item.label}</h4>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-info-divider" />

      <p className="contact-info-footer">
        ✦ &nbsp; Luxury hospitality since 2005 &nbsp; ✦
      </p>

    </div>
  );
}

export default ContactInfo;