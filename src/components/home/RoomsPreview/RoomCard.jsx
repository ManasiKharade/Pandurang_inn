import "./RoomCard.css";

function RoomCard({ room }) {
  return (
    <div className="room-card">

      <div className="room-image-placeholder">
        Image Coming Soon
      </div>

      <div className="room-content">

        <div className="room-header">
          <h3>{room.name}</h3>
          <span className="room-price">
            {room.price}
            <small>/Night</small>
          </span>
        </div>

        <div className="room-rating">
          ★★★★★
        </div>

        <p>{room.description}</p>

        <ul className="room-amenities">
          {room.amenities.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>

        <button className="room-btn">
          View Details
        </button>

      </div>

    </div>
  );
}

export default RoomCard;