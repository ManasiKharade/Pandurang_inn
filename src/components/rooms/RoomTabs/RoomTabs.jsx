import "./RoomTabs.css";

function RoomTabs({ rooms, activeRoom, setActiveRoom }) {
  return (
    <div className="room-tabs">
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => setActiveRoom(room)}
          className={
            activeRoom.id === room.id
              ? "room-tab active"
              : "room-tab"
          }
        >
          {room.name}
        </button>
      ))}
    </div>
  );
}

export default RoomTabs;