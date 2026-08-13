import "./AboutStats.css";
import aboutStats from "../../../data/aboutStats";

function AboutStats() {

    return (

        <div className="about-stats">

            {aboutStats.map((item) => (

                <div
                    className="stat-card"
                    key={item.id}
                >

                    <h3>{item.number}</h3>

                    <p>{item.title}</p>

                </div>

            ))}

        </div>

    );

}

export default AboutStats;