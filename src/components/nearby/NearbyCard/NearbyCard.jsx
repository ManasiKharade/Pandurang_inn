import "./NearbyCard.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaWalking, FaCar } from "react-icons/fa";

function NearbyCard({ place }) {
  return (
    <Link to={`/place/${place.id}`} className="nearby-card">

      <div className="nearby-card-image-wrapper">
        <img
          src={place.image}
          alt={place.name}
          className="nearby-card-image"
          loading="lazy"
        />
        <div className="nearby-card-overlay"></div>
        <span className="nearby-card-category">{place.category}</span>
        <span className="nearby-card-distance">
          <FaMapMarkerAlt /> {place.distance} from hotel
        </span>
      </div>

      <div className="nearby-card-content">
        <h3 className="nearby-card-title">{place.name}</h3>

        <div className="nearby-card-travel-info">
          {place.walk && place.walk !== "-" && (
            <span className="nearby-travel-item">
              <FaWalking className="nearby-travel-icon" />
              {place.walk} walk
            </span>
          )}
          {place.drive && (
            <span className="nearby-travel-item">
              <FaCar className="nearby-travel-icon" />
              {place.drive} drive
            </span>
          )}
        </div>

        <div className="nearby-card-footer">
          <span className="see-more-btn">
            See More <FaArrowRight />
          </span>
        </div>
      </div>

    </Link>
  );
}

export default NearbyCard;