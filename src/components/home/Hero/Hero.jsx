import "./Hero.css";
import heroImage from "../../../assets/images/home/hero.png";
import hotelLogo from "../../../assets/logos/PANDURANG_INN LOGO.png";
import { FaBed, FaCrown, FaStar, FaHeadset } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Left Content */}
      <div className="hero-left">
        <div className="hero-content" data-aos="fade-right">
          <span className="hero-badge">✦ Welcome to Pandurang Inn</span>

          <img src={hotelLogo} alt="Pandurang Inn Logo" className="hero-logo" />

          <h1 className="hero-title">
            Luxury Stay,
            <br />
            Perfect Comfort &
            <br />
            <span>Hospitality</span>
          </h1>

          <div className="hero-divider">
            <span></span> ✦ <span></span>
          </div>

          <p className="hero-description">
            Experience elegant rooms, warm hospitality and
            unforgettable stays in the heart of Pandharpur.
          </p>

          {/* Stats row inside left content */}
          <div className="hero-stats" data-aos="fade-up" data-aos-delay="200">
            <div className="stat">
              <div className="stat-icon"><FaBed /></div>
              <div className="stat-text">
                <h3>25+</h3>
                <p>Luxury Rooms</p>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon"><FaCrown /></div>
              <div className="stat-text">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon"><FaStar /></div>
              <div className="stat-text">
                <h3>4.9★</h3>
                <p>Guest Rating</p>
              </div>
            </div>

            <div className="stat">
              <div className="stat-icon"><FaHeadset /></div>
              <div className="stat-text">
                <h3>24/7</h3>
                <p>Premium Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image — full portrait displayed */}
      <div className="hero-right" data-aos="fade-left" data-aos-delay="100">
        <img src={heroImage} alt="Pandurang Inn Hotel Facade" className="hero-image" />
        <div className="hero-image-overlay"></div>
      </div>
    </section>
  );
}

export default Hero;