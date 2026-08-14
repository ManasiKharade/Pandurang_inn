import Hero from "../../components/home/Hero/Hero";

import About from "../About/About";
// import Dining from "../Dining/Dining";
import Rooms from "../Rooms/Rooms";
import Dormitory from "../Dormitory/Dormitory";
// import MeetingEvents from "../MeetingEvents/MeetingEvents";
import Services from "../Services/Services";
import NearbyPlaces from "../NearbyPlaces/NearbyPlaces";
import Contact from "../Contact/Contact";

function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      {/* <section id="dining">
        <Dining />
      </section> */}

      <section id="rooms">
        <Rooms />
      </section>

      <section id="dormitory">
        <Dormitory />
      </section>

      {/* <section id="events">
        <MeetingEvents />
      </section> */}

      <section id="services">
        <Services />
      </section>

      <section id="nearby">
        <NearbyPlaces />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default Home;