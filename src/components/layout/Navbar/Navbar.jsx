import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import navigation from "../../../data/navigation";
import logo from "../../../assets/logos/PANDURANG_INN LOGO.png";

import Button from "../../common/Button/Button";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle scrolled state for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const sectionIds = navigation.map((item) => item.sectionId).filter(Boolean);
    const viewportMiddle = window.innerHeight / 2;
    let closestSection = "home";
    let smallestDistance = Number.POSITIVE_INFINITY;

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionMiddle = rect.top + rect.height / 2;
      const distance = Math.abs(sectionMiddle - viewportMiddle);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestSection = id;
      }
    });

    setActiveSection(closestSection);
  }, []);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection, location]);

  // Smooth scroll to a section by id
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReserveStay = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById("contact");
    if (target) {
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}>
        <div className="container navbar-container">
          <a
            href="/"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={logo} alt="Pandurang Inn" />
            <span className="logo-text">PANDURANG INN</span>
          </a>

          <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            {navigation.map((item) => {
              const isActive = activeSection === item.sectionId;

              return (
                <a
                  key={item.id}
                  href={item.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={(e) => {
                    if (item.sectionId === "home") {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      scrollToSection(e, item.sectionId);
                    }
                  }}
                >
                  {item.name}
                </a>
              );
            })}
            <div className="mobile-nav-cta">
              <Button
                text="Reserve Stay"
                variant="primary"
                onClick={handleReserveStay}
              />
            </div>
          </nav>

          <div className="nav-actions">
            <div className="nav-cta desktop-cta">
              <Button
                text="Reserve Stay"
                variant="primary"
                onClick={handleReserveStay}
              />
            </div>

            <button
              className={`nav-toggle ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;