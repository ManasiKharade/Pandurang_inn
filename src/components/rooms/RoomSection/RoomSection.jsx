import "./RoomSection.css";
import ImageSlider from "../ImageSlider/ImageSlider";

/* Amenity icon map — maps keyword → SVG path */
const amenityIcons = {
  "Wi-Fi": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
  "Room Service": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  ),
  "Air Conditioning": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="8" rx="2" /><path d="M12 14v4m-4-2 4 2 4-2M7 6V4m10 2V4" />
    </svg>
  ),
  "TV": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 20h8M12 18v2" />
    </svg>
  ),
  "Breakfast": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  "Coffee": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    </svg>
  ),
  "Water": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  "Toilet": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3a4 4 0 0 1 4 4v4H8V7a4 4 0 0 1 4-4z" /><rect x="6" y="11" width="12" height="3" rx="1" />
      <path d="M10 14v4m4-4v4" />
    </svg>
  ),
  "Balcony": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "Jacuzzi": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3-3 6-3 6 3 9 3 6-3 6-3" /><path d="M2 17s3-3 6-3 6 3 9 3 6-3 6-3" />
      <path d="M7 5c0-1.1.9-2 2-2s2 .9 2 2" />
    </svg>
  ),
  "Living Room": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
      <path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3z" />
      <path d="M4 16v2M20 16v2M6 11V9M18 11V9" />
    </svg>
  ),
  "Housekeeping": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  "Bed": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 16h20M7 8v4" />
    </svg>
  ),
  "Bathroom": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6l3-3 3 3" /><rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M10 17a1 1 0 0 0 2 0v-5a1 1 0 0 0-2 0v5z" />
    </svg>
  ),
  "Butler": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  "Seating": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
      <path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3z" />
    </svg>
  ),
};

function getIcon(amenity) {
  for (const [key, icon] of Object.entries(amenityIcons)) {
    if (amenity.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  /* Default check-mark icon */
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const highlights = [
  {
    key: "occupancy",
    label: "Guests",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "size",
    label: "Room Size",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    ),
  },
  {
    key: "bed",
    label: "Bed Type",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 16h20M7 8v4" />
      </svg>
    ),
  },
];

function RoomSection({ room, reverse }) {
  return (
    <section className={`room-section ${reverse ? "reverse" : ""}`} id={`room-${room.id}`}>
      <div className="container room-container">

        {/* Image Slider */}
        <div className="room-image-col">
          <ImageSlider images={room.images} roomName={room.name} />
        </div>

        {/* Content */}
        <div className="room-content-col">

          <span className="room-category-badge">{room.category}</span>

          <h2 className="room-name">{room.name}</h2>

          <div className="room-price-tag">
            <span className="price-label">From</span>
            <span className="price-value">{room.price}</span>
          </div>

          <p className="room-desc">{room.description}</p>

          {/* Highlights */}
          <div className="room-highlights">
            {highlights.map(({ key, label, icon }) => (
              <div className="highlight-card" key={key}>
                <div className="highlight-icon">{icon}</div>
                <div>
                  <span className="highlight-label">{label}</span>
                  <strong className="highlight-value">{room[key]}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="room-book-btn"
          >
            <span>Enquire Now</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

        </div>
      </div>

      {/* Amenities Strip */}
      <div className="room-amenities-strip">
        <div className="container">
          <h3 className="amenities-title">Room Amenities</h3>
          <div className="amenities-grid">
            {room.amenities.map((item, index) => (
              <div className="amenity-pill" key={index}>
                <span className="amenity-icon">{getIcon(item)}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

export default RoomSection;