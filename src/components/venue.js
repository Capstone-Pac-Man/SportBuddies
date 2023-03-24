import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVenue, selectVenue } from "../reducers/venueSlice";
import { useParams } from "react-router-dom";
import { Button, Offcanvas, ListGroup} from "react-bootstrap";


export const Venue = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const venue = useSelector(selectVenue);

  const id = props.venueId;

  console.log("VENUE", venue)
  console.log("ID+++", id)

  useEffect(() => {
    dispatch(fetchVenue(id));
  }, [dispatch]);

  return (
    <>
      <Button className='myBtn' onClick={handleShow}>
        See details
      </Button>
      {venue && venue.name ? (
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
              height="240"
              width="360"
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
