import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Button, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import { fetchAllVenuesAsync, selectVenues } from "../../reducers/venuesSlice";

export const VenuesBox = () => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch()
  const venues = useSelector(selectVenues)

  useEffect(()=>{
    dispatch(fetchAllVenuesAsync())
  }, [dispatch])

  if (!venues.length) return "Loading. Please wait";

  const displayCards = showMore ? venues : venues.slice(0, 6);

  const renderCards = () => {
    return displayCards.map(card => (
      <Col key={card.id} md={4} style={{margin:"auto"}}>
        <Card.Body className="homeCard">
          <Card.Img
            style={{
              width: "500px",
              height: "350px",
              borderRadius: "10%"
            }}
            className="homeImg"
            src={card.imageUrl}
            alt="First slide"
          />
          <div className="homeTextBox">
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </div>
        </Card.Body>
      </Col>
    ));
  };

  return (
    <>
      <Row>
        <h1 className="homeHeader">Venues Near You</h1>
      </Row>
      <Row>
        {renderCards().slice(0, 3)}
      </Row>
      <Row>
        {renderCards().slice(3, 6)}
      </Row>
      {displayCards.length < venues.length && <Button variant="primary" onClick={() => setShowMore(true)}>Show More</Button>}
    </>
  );
};
