import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Button, Col } from "react-bootstrap";
import MultiCarousel from "./multiCarousel";
import PlayerCard from "./playerCard";

import { fetchAllVenuesAsync, selectVenues } from "../../reducers/venuesSlice";
import Venue from "../venue";

export const VenuesBox = ({ location }) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  const venues = useSelector(selectVenues);

  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [location]);

  if (!venues.length) return "Loading. Please wait";
  const items = venues.map((e) => {
    return <PlayerCard key={e.id} player={e} />;
  });

  return (
    <>
      <h1 className="homeHeader" style={{ marginTop: 10 }}>
        Venues Near You
      </h1>
      <div style={{ width: "100%" }} className="multi-list">
        <MultiCarousel style={{ display: "flex" }} items={items} />
      </div>
    </>
  );
};

// {/* <>
//       <Row>
//         <h1 className="homeHeader">Venues Near You</h1>
//       </Row>
//       <Row>{renderCards().slice(0, 3)}</Row>
//       <Row>{renderCards().slice(3, 6)}</Row>
//       {displayCards.length < venues.length && (
//         <Button variant="primary" onClick={() => setShowMore(true)}>
//           Show More
//         </Button>
//       )}
//     </>
//  const renderCards = () => {
//    return displayCards.map((card) => (
//      <Col key={card.id} md={4} style={{ margin: "auto" }}>
//        <Card.Body className="homeCard">
//          <Card.Img
//            style={{
//              width: "500px",
//              height: "350px",
//              borderRadius: "10%",
//            }}
//            className="homeImg"
//            src={card.imageUrl}
//            alt="First slide"
//          />
//          <div className="homeTextBox">
//            <Card.Title>{card.name}</Card.Title>
//            <Card.Text>{card.description}</Card.Text>
//          </div>
//        </Card.Body>
//      </Col>
//    ));
//  }; */}
