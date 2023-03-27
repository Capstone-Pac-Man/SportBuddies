import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVenue, selectVenue } from "../reducers/venueSlice";
import { useParams } from "react-router-dom";
import { Button, Offcanvas, ListGroup } from "react-bootstrap";

export const Venue = (props) => {
  const [show, setShow] = useState(false);
  const venue = useSelector(selectVenue);
  const id = props.venueId;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatch(fetchVenue(id));
    setShow(true);
  };
  const dispatch = useDispatch();

  // console.log("VENUE", venue)
  // console.log("ID+++", id)

  // useEffect(() => {
  //   dispatch(fetchVenue(id));
  // }, [dispatch]);

  // if (!venue.name) return <h1>Loading...</h1>;

  return (
    <>
      <button className="pill-button" onClick={() => handleShow()}>
        See details
      </button>
      <>
        <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{venue.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div>
            <p>
              <strong>Address:</strong> {venue.address}, {venue.city}, {venue.state}
            </p>{" "}
            <p>
              <strong>Hours:</strong> {venue.hours}
            </p>
            <img
              src={venue.imageUrl}
              className="img-fluid rounded-start" 
              style={{width:"360px"}}
              alt="arena"
            ></img>
          </div>
          <br></br>
          <div>
            <h4>Sports Offered:</h4>
            {venue.sports && venue.sports[0] ? (
              <div>
                <ListGroup>
                  {venue.sports.map((sport) => {
                    return <ListGroup.Item key={sport.name}>{sport.name}</ListGroup.Item>;
                  })}
                </ListGroup>
              </div>
            ) : (
              <div>Venue is loading</div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
        
        </>
      ) : (
        <div>No venue exists with id = {id}</div>
      )}

    </>
  );
};

export default Venue;
