import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVenuesAsync } from "../reducers/venuesSlice";
import Venue from "./venue";
import Loading from "../assets/Loading";

export default function Venues() {
  const dispatch = useDispatch();

  const venues = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch]);
  if (venues.loading) {
    return <Loading />;
  } else {
    return (
      <div className="players-container">
        <h1 style={{ width: "100%", marginLeft: "1rem", fontWeight: 700 }}>
          Venues
        </h1>

        {venues.length === 0 ? (
          <div>
            <h3 style={{ marginTop: 50 }} className="text-center">
              No registered venues near you.
            </h3>
            <p className="text-center text-muted">
              (Try changing your location)
            </p>
          </div>
        ) : (
          venues.map((e) => {
            return (
              <Card key={e.id} className="player-card">
                <Card.Img variant="top" src={e.imageUrl} />

                <Card.Body style={{ minWidth: "100%", display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "80%",
                    }}>
                    <Card.Title>{e.name}</Card.Title>
                  </div>
                  <Venue venueId={e.id} />
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
    );
  }
}
