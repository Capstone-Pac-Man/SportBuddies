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
import Venue from "./venue";
import Loading from "../assets/Loading";

export default function Venues() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();

  const sports = useSelector((state) => state.sports);
  const venues = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch]);

  const handleClear = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleApply = () => {
    const arr = [];
    const checkboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    ).filter((checkbox) => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      arr.push(checkbox.id);
    });

    dispatch(fetchAllVenuesAsync(JSON.stringify(arr)));

    console.log(arr);
  };

  // If there are no venues, then say so!
  // If there are venues, map them out into cards
  return (
    <div className="players-container">
      {/* Perhaps we can reuse this container? */}
      <h1 style={{ width: "100%", marginLeft: "1rem", fontWeight: 700 }}>
        Venues
      </h1>
      <div className="filters-bar">
        <Hamburger toggled={open} toggle={setOpen} size={22} duration={0.3} />
        <Collapse in={open}>
          <div>
            <div className="sport-filters">
              {sports.length > 0
                ? sports.map((e) => {
                    return (
                      <div key={e.id}>
                        <h5 style={{ marginBottom: 0 }}>
                          <Form.Check
                            type="checkbox"
                            id={e.name}
                            label={e.name}
                          ></Form.Check>
                        </h5>
                      </div>
                    );
                  })
                : "Loading..."}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{ margin: "1rem" }}
                onClick={handleClear}
                className="btn btn-small btn-danger"
              >
                Clear
              </Button>

              <Button
                style={{ margin: "1rem" }}
                onClick={handleApply}
                className="btn btn-small btn-dark"
              >
                Apply
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
      {/* {venues.loading ? <Loading /> : } */}
      {venues.loading ? (
        <Loading />
      ) : venues.length === 0 ? (
        <div>
          <h3 style={{ marginTop: 50 }} className="text-center">
            No registered venues near you.
          </h3>
          <p className="text-center text-muted">(Try changing your location)</p>
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
                  }}
                >
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {e.distance.toFixed(1)} miles away
                  </Card.Subtitle>
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
