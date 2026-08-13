import './Footer.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logos/PANDURANG_INN.png';
import navigation from '../../../data/navigation';

const socialLinks = [
  {
    id: 1,
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'WhatsApp',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

const quickLinks = navigation.slice(0, 5);
const moreLinks = navigation.slice(5);

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* ── Main Footer Body ── */}
      <div className="footer-body">
        <div className="footer-container">

          {/* Brand Column */}
          <div className="footer-brand">
            <NavLink to="/" className="footer-logo">
              <img src={logo} alt="Pandurang Inn" />
            </NavLink>
            <p className="footer-tagline">
              Comfort, culture &amp; warm hospitality in the heart of Pandharpur — right beside the sacred Shri Vitthal Rukmini Temple.
            </p>
            <div className="footer-socials">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.path} className="footer-link">
                    <span className="footer-link-arrow">›</span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links">
              {moreLinks.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.path} className="footer-link">
                    <span className="footer-link-arrow">›</span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>Pandurang Inn, bhajandas chowk, 909, opposite BARABHAI TALIM, Govindpura, Pandharpur, Maharashtra 413304</span>
              </li>
              <li>
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.48 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a href="tel:+912166220000" className="footer-contact-link">+91 21662 20000</a>
              </li>
              <li>
                <span className="footer-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <a href="mailto:info@panduranginn.com" className="footer-contact-link">info@panduranginn.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <p className="footer-copyright">
            © {year} Pandurang Inn. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-divider">·</span>
            <a href="#" className="footer-legal-link">Terms of Use</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
