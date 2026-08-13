import "./EventFeatures.css";
import { FaCheck } from "react-icons/fa";

function EventFeatures({ features }) {

    return (

        <div className="event-features">

            {features.map((feature, index) => (

                <div
                    className="feature-item"
                    key={index}
                >

                    <div className="feature-icon">

                        <FaCheck />

                    </div>

                    <span>{feature}</span>

                </div>

            ))}

        </div>

    );

}

export default EventFeatures;