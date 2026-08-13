import "./EventsPreview.css";
import events from "../../../data/events";

function EventsPreview() {
  return (
    <section className="events-preview">
      <div className="container">

        <div className="section-heading">
          <span>MEETINGS & EVENTS</span>

          <h2>Host Your Special Moments With Us</h2>

          <p>
            Whether it's a wedding, conference or celebration,
            Pandurang Inn offers elegant venues for every occasion.
          </p>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>

              <div className="event-image">
                Image Coming Soon
              </div>

              <div className="event-content">
                <h3>{event.name}</h3>

                <p>{event.description}</p>

                <span>{event.capacity}</span>

                <button>Know More</button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default EventsPreview;