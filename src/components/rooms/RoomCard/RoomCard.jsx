import Card from '../../common/Card/Card';

function RoomCard({ room, ...props }) {
  return (
    <Card title={room.name} description={room.description} {...props} />
  );
}

export default RoomCard;
