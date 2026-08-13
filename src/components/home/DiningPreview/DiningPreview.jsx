import "./DiningPreview.css";
import dining from "../../../data/dining";
import { useNavigate } from "react-router-dom";

function DiningPreview() {
  const navigate = useNavigate();

  const restaurant = dining[0];

  return (
    <section className="dining-preview">

      <div className="section-heading">

        <span>DINING EXPERIENCE</span>

        <h2>{restaurant.name}</h2>

        <p>{restaurant.description}</p>

      </div>

      <div className="dining-image">

        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
        />

      </div>

      <div className="dining-features">

        {restaurant.features.map((item, index) => (

          <div
            className="feature-card"
            key={index}
          >
            {item}
          </div>

        ))}

      </div>

      <button
        className="dining-btn"
        onClick={() => navigate("/contact")}
      >
        {restaurant.button}
      </button>

    </section>
  );
}

export default DiningPreview;