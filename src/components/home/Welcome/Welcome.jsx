import "./Welcome.css";
import about from "../../../data/about";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <section className="welcome">

      <div className="container">

        <div className="welcome-image">

          <div className="image-placeholder">
            Hotel Image Coming Soon
          </div>

        </div>

        <div className="welcome-content">

          <span>{about.tag}</span>

          <h2>{about.title}</h2>

          <p>{about.description1}</p>

          <p>{about.description2}</p>

          <div className="features-grid">

            {[
              "Luxury Accommodation",
              "Prime Location",
              "24/7 Front Desk",
              "Peaceful Atmosphere",
            ].map((item, index) => (

              <div className="feature-item" key={index}>

                <div className="feature-icon">
                  ✓
                </div>

                {item}

              </div>

            ))}

          </div>

          <button
            className="about-btn"
            onClick={() => window.location.href = "/contact"}
          >
            {about.button}
          </button>

        </div>

      </div>

    </section>
  );
}

export default Welcome;