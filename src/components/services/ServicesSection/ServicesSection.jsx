import { useEffect, useRef, useState } from "react";
import "./ServicesSection.css";
import services from "../../../data/services";
import FacilityFeature from "../FacilityFeature/FacilityFeature";

function ServicesSection() {
  return (
    <section className="services-section">

      {/* =========================
          HEADING
      ========================= */}

      <div className="services-heading" data-aos="fade-up">

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
        {services.map((facility, index) => (
          <FacilityFeature
            key={facility.id}
            facility={facility}
            index={index}
          />
        ))}
      </div>

    </section>
  );
}

export default ServicesSection;