import { useState } from "react";
import "./DiningSection.css";

import dining from "../../../data/dining";

import DiningTabs from "../DiningTabs/DiningTabs";
import DiningExperience from "../DiningExperience/DiningExperience";

function DiningSection() {

    const [activeDining, setActiveDining] = useState(dining[0]);

    return (

        <section className="dining-section">

            <div className="dining-heading">

                <span>DINING & RESTAURANT</span>

                <h2>Restaurants & Bar</h2>

                <p>
                    Discover exceptional dining experiences, from delicious
                    multi-cuisine meals to handcrafted beverages in a relaxing
                    atmosphere.
                </p>

            </div>

            <DiningTabs
                dining={dining}
                activeDining={activeDining}
                setActiveDining={setActiveDining}
            />

            <DiningExperience
                dining={activeDining}
            />

        </section>

    );

}

export default DiningSection;