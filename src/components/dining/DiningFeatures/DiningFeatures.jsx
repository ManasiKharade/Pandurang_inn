import "./DiningFeatures.css";
import { FaCheck } from "react-icons/fa";

function DiningFeatures({ features }) {
  return (
    <div className="dining-features">

      {features.map((feature, index) => (

        <div className="feature-item" key={index}>

          <div className="feature-icon">
            <FaCheck />
          </div>

          <span>{feature}</span>

        </div>

      ))}

    </div>
  );
}

export default DiningFeatures;