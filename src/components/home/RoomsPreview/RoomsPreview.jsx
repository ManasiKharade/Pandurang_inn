import "./RoomsPreview.css";
import rooms from "../../../data/rooms";
import RoomCard from "./RoomCard";

function RoomsPreview() {
  return (
    <section className="rooms-preview">

      <div className="container">

        <span className="section-tag">
          OUR ROOMS
        </span>

        <h2>
          Luxury Rooms & Suites
        </h2>

        <p className="section-description">
          Experience thoughtfully designed rooms offering
          elegance, comfort, and modern amenities for an
          unforgettable stay.
        </p>

        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}
        </div>

        <button className="view-all-btn">
          View All Rooms →
        </button>

      </div>

    </section>
  );
}

export default RoomsPreview;