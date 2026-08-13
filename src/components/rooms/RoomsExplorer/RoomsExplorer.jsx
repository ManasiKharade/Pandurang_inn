import { useState, useCallback, useEffect } from "react";
import "./RoomsExplorer.css";
import rooms from "../../../data/rooms";



/* ─── Small helpers ─── */
const formatIndex = (n) => String(n + 1).padStart(2, "0");

/* ─── Amenity icon lookup ─── */
function AmenityIcon({ label }) {
  const l = label.toLowerCase();
  if (l.includes("wi-fi") || l.includes("wifi"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>;
  if (l.includes("tv"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8M12 18v2"/></svg>;
  if (l.includes("breakfast"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>;
  if (l.includes("coffee") || l.includes("tea"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>;
  if (l.includes("air") || l.includes("conditioning"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="20" height="8" rx="2"/><path d="M12 14v4m-4-2 4 2 4-2M7 6V4m10 2V4"/></svg>;
  if (l.includes("balcony"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if (l.includes("jacuzzi"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s3-3 6-3 6 3 9 3 6-3 6-3"/><path d="M2 17s3-3 6-3 6 3 9 3 6-3 6-3"/></svg>;
  if (l.includes("living"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3z"/></svg>;
  if (l.includes("butler"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  if (l.includes("bed"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 16h20M7 8v4"/></svg>;
  if (l.includes("water"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>;
  if (l.includes("room service"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>;
  /* default */
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
}

export default function RoomsExplorer() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeImg, setActiveImg]   = useState(0);
  const [fading, setFading]         = useState(false);

  const room = rooms[activeRoom];

  /* Switch room with fade */
  const switchRoom = useCallback((idx) => {
    if (idx === activeRoom) return;
    setFading(true);
    setTimeout(() => {
      setActiveRoom(idx);
      setActiveImg(0);
      setFading(false);
    }, 350);
  }, [activeRoom]);

  /* Auto-advance gallery */
  useEffect(() => {
    if (!room.images?.length) return;
    const t = setInterval(() => {
      setActiveImg((p) => (p + 1) % room.images.length);
    }, 4500);
    return () => clearInterval(t);
  }, [room]);

  return (
    <div className="rx">

      {/* ══════════ HERO ══════════ */}
      <div className="rx-hero">
        {/* Background blurred image */}
        <div
          className="rx-hero__bg"
          style={{ backgroundImage: `url(${room.images?.[activeImg]})` }}
        />
        <div className="rx-hero__vignette" />

        {/* Big room number */}
        <div className="rx-hero__num">{formatIndex(activeRoom)}</div>

        {/* Tab bar */}
        <nav className="rx-tabs">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              className={`rx-tab ${i === activeRoom ? "active" : ""}`}
              onClick={() => switchRoom(i)}
            >
              <span className="rx-tab__idx">{formatIndex(i)}</span>
              <span className="rx-tab__name">{r.name}</span>
              {i === activeRoom && <span className="rx-tab__bar" />}
            </button>
          ))}
        </nav>
      </div>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className={`rx-body ${fading ? "fading" : ""}`}>

        {/* ── Vertical gallery sidebar ── */}
        <aside className="rx-gallery">
          {room.images?.map((src, i) => (
            <button
              key={i}
              className={`rx-gallery__thumb ${i === activeImg ? "active" : ""}`}
              onClick={() => setActiveImg(i)}
            >
              <img src={src} alt={`${room.name} ${i + 1}`} />
              <span className="rx-gallery__thumb-num">{formatIndex(i)}</span>
            </button>
          ))}
        </aside>

        {/* ── Main image ── */}
        <div className="rx-main-img">
          <img
            key={`${activeRoom}-${activeImg}`}
            src={room.images?.[activeImg]}
            alt={room.name}
            className="rx-main-img__img"
          />

          {/* Image counter */}
          <div className="rx-main-img__counter">
            <span>{formatIndex(activeImg)}</span>
            <span className="rx-main-img__counter-sep" />
            <span className="rx-main-img__counter-total">{formatIndex((room.images?.length ?? 1) - 1)}</span>
          </div>

          {/* Prev / Next */}
          <button
            className="rx-arrow rx-arrow--prev"
            onClick={() => setActiveImg((p) => (p === 0 ? room.images.length - 1 : p - 1))}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            className="rx-arrow rx-arrow--next"
            onClick={() => setActiveImg((p) => (p + 1) % room.images.length)}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* ── Info panel ── */}
        <aside className="rx-info">

          <p className="rx-info__eyebrow">Pandurang Inn · {room.category}</p>
          <h2 className="rx-info__name">{room.name}</h2>
          <div className="rx-info__divider" />

          <p className="rx-info__price">{room.price}</p>

          <p className="rx-info__desc">{room.description}</p>

          {/* Stats */}
          <div className="rx-stats">
            <div className="rx-stat">
              <span className="rx-stat__val">{room.size}</span>
              <span className="rx-stat__lbl">Room Size</span>
            </div>
            <div className="rx-stat__sep" />
            <div className="rx-stat">
              <span className="rx-stat__val">{room.occupancy.replace("Up to ", "")}</span>
              <span className="rx-stat__lbl">Guests</span>
            </div>
            <div className="rx-stat__sep" />
            <div className="rx-stat">
              <span className="rx-stat__val">{room.bed}</span>
              <span className="rx-stat__lbl">Bed</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="rx-amenities">
            <p className="rx-amenities__title">Amenities</p>
            <ul className="rx-amenities__list">
              {room.amenities.map((a, i) => (
                <li key={i} className="rx-amenities__item">
                  <span className="rx-amenities__icon"><AmenityIcon label={a} /></span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#contact"
            className="rx-cta"
          >
            Enquire Now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>

        </aside>
      </div>
    </div>
  );
}
