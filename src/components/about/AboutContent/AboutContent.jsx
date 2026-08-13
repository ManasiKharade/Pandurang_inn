import "./AboutContent.css";
import about from "../../../data/about";
import { FaCheckCircle } from "react-icons/fa";

function AboutContent() {

    const highlights = [
        "Luxury Accommodation",
        "Prime Location",
    ];

    return (

        <div className="about-content">

            <span className="about-tag">
                {about.tag}
            </span>

            <h2>
                {about.title}
            </h2>

            <p>
                {about.description1}
            </p>

            <p>
                {about.description2}
            </p>

            <div className="about-highlights">

                {highlights.map((item, index) => (

                    <div className="highlight" key={index}>

                        <FaCheckCircle />

                        <span>{item}</span>

                    </div>

                ))}

            </div>
        </div>

    );

}

export default AboutContent;