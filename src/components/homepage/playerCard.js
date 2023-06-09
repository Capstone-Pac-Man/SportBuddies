import Card from "react-bootstrap/Card";
import { SingleUserPage } from "../users/singleUserPage";
import Venue from "../venue";

export default function PlayerCard({ player }) {
  return (
    <Card
      key={player.id}
      className={player.password ? "multi-card" : "vertical-card"}
      style={{ margin: "1rem" }}
    >
      <Card.Img
        variant="top"
        src={player.imageUrl}
        style={{ objectFit: "cover", aspectRatio: "3/2" }}
      />

      <Card.Body style={{ minWidth: "100%", display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
          <Card.Title
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {player.fullName ? player.fullName : player.name}
          </Card.Title>
          <Card.Subtitle className="text-muted">
            {player.distance
              ? `${player.distance.toFixed(1)} miles away`
              : player.description}
          </Card.Subtitle>
        </div>
        {player.password ? (
          <Venue venueId={player.id} />
        ) : (
          <SingleUserPage playerId={player.id} />
        )}
      </Card.Body>
    </Card>
  );
}
