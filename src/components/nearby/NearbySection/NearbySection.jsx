import "./NearbySection.css";

import nearbyPlaces from "../../../data/nearbyPlaces";
import NearbyCard from "../NearbyCard/NearbyCard";

// debug HMR: log when this module is evaluated
console.log("NearbySection loaded");

function NearbySection() {

  return (

    <section className="nearby-section">

      <div className="nearby-heading">

        <span>NEARBY ATTRACTIONS</span>

        <h2>EXPLORE PANDHARPUR </h2>

        <p>
          Stay close to the spiritual, cultural and essential destinations
          that make your visit to Pandharpur comfortable and memorable.
        </p>

      </div>

      <div className="nearby-grid">

        {nearbyPlaces.map((place) => (

          <NearbyCard
            key={place.id}
            place={place}
          />

        ))}

      </div>

    </section>

  );

}

export default NearbySection;