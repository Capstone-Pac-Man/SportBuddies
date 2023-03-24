import Card from "react-bootstrap/Card";
import { SingleUserPage } from "../users/singleUserPage";
import Venue from "../venue";

export default function PlayerCard({ player }) {
  console.log(player);

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
        {player.description ? <Venue venueId={player.id}/> : <SingleUserPage playerId={player.id} />}
    </Card>
  );
}
