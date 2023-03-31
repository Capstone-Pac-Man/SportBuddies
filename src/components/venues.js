import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Collapse from "react-bootstrap/Collapse";
import { Squash as Hamburger } from "hamburger-react";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVenuesAsync } from "../reducers/venuesSlice";
import Venue from "./venue";
import Loading from "../assets/Loading";

export default function Venues() {
  const [open, setOpen] = useState(false);
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
  };

  return (
    <div className="players-container">
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
                            label={e.name}></Form.Check>
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
              }}>
              <Button
                style={{ margin: "1rem" }}
                onClick={handleClear}
                className="btn btn-small btn-danger">
                Clear
              </Button>

              <Button
                style={{ margin: "1rem" }}
                onClick={handleApply}
                className="btn btn-small btn-dark">
                Apply
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
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
                  }}>
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
