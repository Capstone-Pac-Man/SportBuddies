import Card from "react-bootstrap/Card";

export default function PlayerCard({ player }) {
  return (
    <Card key={player.id} className="multi-card" style={{ margin: "1rem" }}>
      <Card.Img variant="top" src={player.imageUrl} />
      <Card.Body>
        <Card.Title>
          {player.fullName ? player.fullName : player.name}
        </Card.Title>
        <Card.Subtitle className="text-muted">
          {player.distance
            ? `${player.distance.toFixed(1)} miles away`
            : player.description}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
