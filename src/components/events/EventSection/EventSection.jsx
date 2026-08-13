import "./EventSection.css";

import event from "../../../data/events";

import EventShowcase from "../EventShowcase/EventShowcase";

function EventSection() {

  return (

    <section className="event-section">

      <div className="event-heading">

        <span>MEETINGS & EVENTS</span>

        <h2>Celebrate Every Special Occasion</h2>

        <p>
          This spaces thoughtfully designed for weddings,
          receptions, birthdays, corporate meetings and 
          celebrations.
        </p>

      </div>

      <EventShowcase event={event} />

    </section>

  );

}

export default EventSection;