import { fetchAllUsersAsync } from "../reducers/usersSlice";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Collapse from "react-bootstrap/Collapse";
import { Squash as Hamburger } from "hamburger-react";
// import { fetchAllSportsAsync } from "../reducers/sportsSlice";
import { SingleUserPage } from "./users/singleUserPage";
import PlayerCard from "./homepage/playerCard";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVenuesAsync, selectVenues } from "../reducers/venuesSlice";
import { Link } from "react-router-dom";

export default function Venues() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const venues = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch]);

  // If there are no venues, then say so!
  if (venues.length === 0) {
    return (
      <h1 className="text-center" style={{ marginTop: "20vh" }}>
        No venues found!
      </h1>
    );
  } else {
    // If there are venues, map them out into cards
    return (
      <div className="players-container">
        {/* Perhaps we can reuse this container? */}
        <h1 style={{ width: "100%", marginLeft: "1rem", fontWeight: 700 }}>
          <i>VENUES.</i>
        </h1>

        {venues.map((e) => {
          return (
            <Card key={e.id} className="player-card">
              <Card.Img variant="top" src={e.imageUrl} />

              <Card.Body style={{ minWidth: "100%", display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                  }}
                >
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {e.description}
                  </Card.Subtitle>
                </div>
                {/* <SingleUserPage playerId={e.id} /> */}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
// BORING DOWN HERE //

/* 
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVenuesAsync, selectVenues } from "../reducers/venuesSlice";
import { Link } from "react-router-dom";

export default function Venues() {
  const dispatch = useDispatch();
  const venues = useSelector(selectVenues);
  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch]);

  return (
    <>
      <h1>
        <u>VENUES</u>
      </h1>{" "}
      <h3>Click to view individual venue details in new tab</h3>
      {venues && venues[0] ? (
        <div>
          <ul>
            {venues.map((venue) => {
              return (
                <li key={venue}>
                  {venue.name}: {venue.address}
                  <br></br>
                  <Link to={`/venues/${venue.id}`} rel="noreferrer">
                    <img
                      src={venue.imageUrl}
                      alt="Dazzling foto of the venue"
                      height="158"
                      width="273"
                    ></img>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>No venues to show.</div>
      )}
    </>
  );
}
*/
