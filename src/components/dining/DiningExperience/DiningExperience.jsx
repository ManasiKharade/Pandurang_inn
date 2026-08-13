import "./DiningExperience.css";
import GallerySlider from "../../common/GallerySlider/GallerySlider";
import DiningFeatures from "../DiningFeatures/DiningFeatures";
import { motion } from "framer-motion";

function DiningExperience({ dining }) {
  if (!dining) return null;

  return (
    <section className="dining-experience">

      {/* Left Side - Slider */}
      <motion.div
        key={dining.id + "-image"}
        className="experience-left"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
       <GallerySlider
    images={dining.images}
/>
      </motion.div>

      {/* Right Side - Details */}
      <motion.div
        key={dining.id}
        className="experience-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >

        <span className="hotel-tag">
          PANDURANG INN
        </span>

        <h2>{dining.name}</h2>

        <p className="dining-tagline">
          {dining.tagline}
        </p>

        <p className="dining-description">
          {dining.description}
        </p>

        <div className="divider"></div>

        <h4 className="features-title">
          Dining Highlights
        </h4>

        <DiningFeatures
          features={dining.features}
        />

       </motion.div>

    </section>
  );
}

export default DiningExperience;