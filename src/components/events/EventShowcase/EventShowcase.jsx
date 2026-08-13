import "./EventShowcase.css";

import GallerySlider from "../../common/GallerySlider/GallerySlider";
import EventFeatures from "../EventFeatures/EventFeatures";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

function EventShowcase({ event }) {
  const navigate = useNavigate();

  if (!event) return null;

  return (

        <section className="event-showcase">

            {/* LEFT */}

            <motion.div
                className="showcase-left"
                initial={{ opacity: 0, scale: .97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: .5 }}
            >

                <GallerySlider
                images={event.images}
                />

            </motion.div>

            {/* RIGHT */}

            <motion.div
                className="showcase-right"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .5 }}
            >

                <span className="hotel-tag">
                    PANDURANG INN
                </span>

                <h2>
                    {event.name}
                </h2>

                <p className="event-tagline">
                    {event.tagline}
                </p>

                <p className="event-description">
                    {event.description}
                </p>

                <div className="divider"></div>

                <h4 className="features-title">
                    Venue Highlights
                </h4>

                <EventFeatures
                    features={event.features}
                />

                <button
                className="event-btn"
                onClick={() => navigate("/?type=event#contact")}
>
                {event.button}
                </button>

            </motion.div>

        </section>

    );

}

export default EventShowcase;