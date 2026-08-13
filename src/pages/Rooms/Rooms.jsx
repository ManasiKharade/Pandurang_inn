import { useState } from "react";
import "./Rooms.css";

import rooms from "../../data/rooms";

import RoomTabs from "../../components/rooms/RoomTabs/RoomTabs";
import RoomShowcase from "../../components/rooms/RoomShowcase/RoomShowcase";

function Rooms() {

  const [activeRoom, setActiveRoom] = useState(rooms[0]);

  return (

    <section className="rooms-section">

      <div className="rooms-heading">

        <span>ROOMS & SUITES </span>

        <h2>Luxury Rooms & Suites</h2>

        <p>
          Experience beautifully designed rooms crafted for comfort,
          elegance and unforgettable stays in the heart of Pandharpur
        </p>

      </div>

      <RoomTabs
        rooms={rooms}
        activeRoom={activeRoom}
        setActiveRoom={setActiveRoom}
      />

      <RoomShowcase room={activeRoom} />

    </section>

  );

}

export default Rooms;