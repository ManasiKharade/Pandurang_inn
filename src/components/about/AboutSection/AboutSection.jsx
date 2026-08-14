import "./AboutSection.css";

import AboutContent from "../AboutContent/AboutContent";
import AboutStats from "../AboutStats/AboutStats";

function AboutSection() {

    return (

        <section className="about-section">

            <div className="about-container">
                <div className="about-left" data-aos="fade-right">
                    <AboutContent />
                </div>

                <div className="about-right" data-aos="fade-left" data-aos-delay="200">
                    <AboutStats />
                </div>
            </div>

        </section>

    );

}

export default AboutSection;