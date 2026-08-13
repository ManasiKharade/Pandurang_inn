import Card from '../../common/Card/Card';

function RoomCard({ room }) {
  return (
    <Card title={room.name} description={room.description} />
  );
}

export default RoomCard;
