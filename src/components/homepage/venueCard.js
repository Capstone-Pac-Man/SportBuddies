// THIS IS GOING TO BE VENUE CARD
// THIS IS GOING TO BE VENUE CARD
// THIS IS GOING TO BE VENUE CARD
// THIS IS GOING TO BE VENUE CARD

import Card from "react-bootstrap/Card";
// import { SingleUserPage } from "../users/singleUserPage";
import Venue from "../venue";

export default function VenueCard({ venue }) {
  return (
    <Card key={venue.id} className="multi-card" style={{ margin: "1rem" }}>
      <Card.Img variant="top" src={venue.imageUrl} />

      <Card.Body style={{ minWidth: "100%", display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
          <Card.Title>{venue.name}</Card.Title>
          <Card.Subtitle className="text-muted">
            {venue.distance.toFixed(1)} miles away
          </Card.Subtitle>
        </div>
        {venue.description ? (
          <Venue venueId={venue.id} />
        ) : (
          <Venue venueId={venue.id} />
        )}
      </Card.Body>
    </Card>
  );
}
