import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./NearbyPlaceDetail.css";

import nearbyPlaces from "../../data/nearbyPlaces";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCar,
  FaClock,
  FaDirections,
  FaCompass,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function NearbyPlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  // Find selected place
  const place = nearbyPlaces.find(
    (item) => item.id === Number(id)
  );

  // Scroll to top whenever place changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // If place does not exist
  if (!place) {
    return (
      <div className="place-not-found">
        <h2>Destination Not Found</h2>

        <p>
          The attraction you are looking for does not exist
          or has been moved.
        </p>

        <button
          className="back-btn"
          onClick={() => navigate("/#nearby")}
        >
          <FaArrowLeft />
          <span>Back to Nearby Attractions</span>
        </button>
      </div>
    );
  }

  /*
    =========================================================
    DETAIL PAGE IMAGES

    Main Nearby Places page still uses place.image.

    Here, ONLY the detail page uses:
    place.image + place.gallery
    =========================================================
  */

  const galleryImages = [
    place.image,
    ...(place.gallery || []).filter(
      (img) => img !== place.image
    ),
  ];

  /*
    =========================================================
    NEXT IMAGE
    =========================================================
  */

  const nextImage = () => {
    setActiveIndex((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    );
  };

  /*
    =========================================================
    PREVIOUS IMAGE
    =========================================================
  */

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );
  };

  /*
    =========================================================
    AUTO SLIDER

    Changes image every 4 seconds
    =========================================================
  */

  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const slider = setInterval(() => {
      setActiveIndex((current) =>
        current === galleryImages.length - 1
          ? 0
          : current + 1
      );
    }, 4000);

    return () => clearInterval(slider);
  }, [galleryImages.length]);

  return (
    <div className="nearby-detail-page">

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <div className="detail-back-container">
        <button
          className="back-btn"
          onClick={() => navigate("/#nearby")}
        >
          <FaArrowLeft />
          <span>Back to Nearby Attractions</span>
        </button>
      </div>


      {/* =====================================================
          FIRST SECTION
          IMAGE CAROUSEL LEFT + DISCOVER RIGHT
      ===================================================== */}

      <section className="detail-intro-section">

        {/* =================================================
            LEFT — IMAGE CAROUSEL
        ================================================= */}

        <div className="detail-main-image">

          <img
            src={galleryImages[activeIndex]}
            alt={`${place.name} view ${activeIndex + 1}`}
          />

          {/* IMAGE OVERLAY */}

          <div className="detail-image-overlay"></div>


          {/* =================================================
              LEFT ARROW
          ================================================= */}

          {galleryImages.length > 1 && (
            <button
              className="image-slider-arrow image-slider-arrow-left"
              onClick={previousImage}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
          )}


          {/* =================================================
              RIGHT ARROW
          ================================================= */}

          {galleryImages.length > 1 && (
            <button
              className="image-slider-arrow image-slider-arrow-right"
              onClick={nextImage}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          )}


          {/* =================================================
              IMAGE CONTENT
          ================================================= */}

          <div className="detail-image-content">

            <span className="detail-category">
              {place.category}
            </span>

            <h1>{place.name}</h1>

            <p>
              {place.summary}
            </p>

          </div>


          {/* =================================================
              IMAGE DOTS
          ================================================= */}

          {galleryImages.length > 1 && (
            <div className="image-slider-dots">

              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={
                    index === activeIndex
                      ? "image-dot active"
                      : "image-dot"
                  }
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}

            </div>
          )}

        </div>


        {/* =================================================
            RIGHT — DISCOVER
        ================================================= */}

        <div className="detail-discover">

          <span className="section-small-title">
            EXPLORE PANDHARPUR
          </span>

          <h2>
            Discover {place.name}
          </h2>

          <p className="discover-description">
            {place.summary}
          </p>


          {/* =================================================
              PLACE DETAILS
          ================================================= */}

          <div className="place-details-list">

            {/* DISTANCE */}

            <div className="place-detail-item">

              <div className="place-detail-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span className="place-detail-label">
                  Distance From Hotel
                </span>

                <strong>
                  {place.distance}
                </strong>
              </div>

            </div>


            {/* DRIVING TIME */}

            {place.drive && (
              <div className="place-detail-item">

                <div className="place-detail-icon">
                  <FaCar />
                </div>

                <div>
                  <span className="place-detail-label">
                    Approx. Driving Time
                  </span>

                  <strong>
                    {place.drive}
                  </strong>
                </div>

              </div>
            )}


            {/* VISITING HOURS */}

            {place.timings && (
              <div className="place-detail-item">

                <div className="place-detail-icon">
                  <FaClock />
                </div>

                <div>
                  <span className="place-detail-label">
                    Visiting Hours
                  </span>

                  <strong>
                    {place.timings}
                  </strong>
                </div>

              </div>
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          SECOND SECTION
          INFORMATION LEFT + MAP RIGHT
      ===================================================== */}

      <section className="detail-lower-section">


        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div className="detail-left-column">


          {/* =================================================
              DISCOVER / ABOUT
          ================================================= */}

          <div className="detail-content-card">

            <div className="content-card-heading">

              <FaCompass />

              <h3>
                Discover {place.name}
              </h3>

            </div>

            <p>
              {place.description}
            </p>

          </div>


          {/* =================================================
              GOOD TO KNOW
          ================================================= */}

          {place.highlights &&
            place.highlights.length > 0 && (
              <div className="detail-content-card">

                <div className="content-card-heading">

                  <FaCheckCircle />

                  <h3>
                    Good to Know
                  </h3>

                </div>


                <ul className="good-to-know-list">

                  {place.highlights.map(
                    (item, index) => (

                      <li key={index}>

                        <FaCheckCircle />

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              </div>
            )}

        </div>


        {/* =================================================
            RIGHT COLUMN — MAP
        ================================================= */}

        <div className="detail-right-column">

          <div className="map-card">


            {/* MAP HEADER */}

            <div className="map-card-header">

              <div>

                <span>
                  LOCATION
                </span>

                <h3>
                  Location Map
                </h3>

              </div>


              <a
                href={place.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >

                <FaDirections />

                <span>
                  Get Directions
                </span>

              </a>

            </div>


            {/* GOOGLE MAP */}

            <div className="map-iframe-wrapper">

              <iframe
                title={`Map of ${place.name}`}
                src={place.mapEmbed}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

            </div>


            {/* MAP FOOTER */}

            <div className="map-footer">

              <FaMapMarkerAlt />

              <p>

                <strong>
                  Pandurang Inn Assistance
                </strong>

                <br />

                Our front desk team can help
                arrange transportation or guide
                you to {place.name}.

              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default NearbyPlaceDetail;