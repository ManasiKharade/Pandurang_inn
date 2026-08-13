import "./ContactSection.css";

import ContactForm from "../ContactForm/ContactForm";
import ContactInfo from "../ContactInfo/ContactInfo";

function ContactSection() {
  return (
    <section className="contact-section">

      <div className="contact-container">
        <div className="contact-card">

          <div className="contact-heading">
            <span>CONTACT US</span>
            <h2>We'd Love to Hear From You</h2>
            <p>
              Whether you're planning your stay, have a question, or need
              assistance, our team is always ready to help.
            </p>
          </div>

          <div className="contact-left">
            <ContactForm />
          </div>

          <div className="contact-right">
            <ContactInfo />
          </div>

        </div>
      </div>

    </section>
  );
}

export default ContactSection;