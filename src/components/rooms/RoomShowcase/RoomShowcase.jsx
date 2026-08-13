import "./RoomShowcase.css";
import GallerySlider from "../../common/GallerySlider/GallerySlider";
import RoomAmenities from "../RoomAmenities/RoomAmenities";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function RoomShowcase({ room }) {
  const navigate = useNavigate();
  if (!room) return null;

  return (
    <section className="room-showcase">

      {/* Left Side - Image Slider */}
      <motion.div
        key={room.id + "-image"}
        className="showcase-left"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
<GallerySlider images={room.images} />      </motion.div>

      {/* Right Side - Room Information */}
      <motion.div
        key={room.id}
        className="showcase-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >

        <span className="hotel-tag">
          PANDURANG INN
        </span>

        <h2>{room.name}</h2>

        <p className="room-description">
          {room.description}
        </p>

        <div className="luxury-divider">
          <span></span>
        </div>

        <h4 className="amenities-title">
          Room Amenities
        </h4>

        <RoomAmenities amenities={room.amenities} />

        <button
          className="reserve-btn"
          onClick={() => navigate("/?type=room#contact")}
        >
          Enquire Now
        </button>

      </motion.div>

    </section>
  );
}

export default RoomShowcase;