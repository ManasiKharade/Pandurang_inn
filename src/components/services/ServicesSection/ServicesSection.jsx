import { useEffect, useRef, useState } from "react";
import "./ServicesSection.css";
import services from "../../../data/services";
import FacilityFeature from "../FacilityFeature/FacilityFeature";

function ServicesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`services-section ${isVisible ? "services-visible" : ""
        }`}
    >

      {/* =========================
          HEADING
      ========================= */}

      <div className="services-heading">

        <span>Hotel Facilities</span>

        <h2>Luxury Facilities</h2>

        <p>
          Thoughtfully curated facilities designed to make every stay
          comfortable, relaxing and memorable.
        </p>

      </div>


      {/* =========================
          ALL 8 SERVICE CARDS
      ========================= */}

      <div className="services-grid">

        {services.map((facility) => (
          <FacilityFeature
            key={facility.id}
            facility={facility}
          />
        ))}

      </div>

    </section>
  );
}

export default ServicesSection;