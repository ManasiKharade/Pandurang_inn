import "./RoomAmenities.css";
import {
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCoffee,
  FaConciergeBell,
  FaGlassCheers,
  FaTint,
  FaBath,
  FaBed,
  FaCouch,
  FaCheck,
  FaCrown,
} from "react-icons/fa";

const iconMap = {
  "Free Wi-Fi": <FaWifi />,
  "High-Speed Wi-Fi": <FaWifi />,
  "Complimentary Breakfast": <FaGlassCheers />,
  "Smart TV": <FaTv />,
  "Air Conditioning": <FaSnowflake />,
  "Tea & Coffee Maker": <FaCoffee />,
  "24-Hour Room Service": <FaConciergeBell />,
  "Daily Housekeeping": <FaConciergeBell />,
  "Mineral Water": <FaTint />,
  "Western Toilet": <FaBath />,
  "Premium Bathroom": <FaBath />,
  "King Size Bed": <FaBed />,
  "Twin Queen Beds": <FaBed />,
  "Butler Service": <FaCrown />,
  "Seating Area": <FaCouch />,
};

function RoomAmenities({ amenities = [] }) {
  const list = amenities || [];
  return (
    <div className="amenities-grid">
      {list.map((item, index) => (
        <div className="amenity-item" key={index}>
          <span className="amenity-icon">
            {iconMap[item] || <FaCheck />}
          </span>

          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default RoomAmenities;