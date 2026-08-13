import "./AboutSection.css";

import AboutContent from "../AboutContent/AboutContent";
import AboutStats from "../AboutStats/AboutStats";

function AboutSection() {

    return (

        <section className="about-section">

            <div className="about-container">

                <div className="about-left">

                    <AboutContent />

                </div>

                <div className="about-right">

                    <AboutStats />

                </div>

            </div>

        </section>

    );

}

export default AboutSection;