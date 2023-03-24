import React, { useEffect, useState } from "react";
import { Row, Card, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync, selectUsers } from "../../reducers/usersSlice";
import MultiCarousel from "./multiCarousel";
import PlayerCard from "./playerCard";
import "react-multi-carousel/lib/styles.css";

export const PlayersBox = ({ location }) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [location]);

  if (!users.length) return "Loading. Please wait";
  const items = users.map((e) => {
    return <PlayerCard key={e.id} player={e} />;
  });

  return (
    <>
      <h1 className="homeHeader">Players Near You</h1>
      <div style={{ width: "100%", paddingBottom: 50 }} className="multi-list">
        <MultiCarousel style={{ display: "flex" }} items={items} />
      </div>
    </>
  );
};
// const displayCards = showMore ? users : users.slice(0, 8);

// const renderCards = () => {
//   return displayCards.map((card) => (
//     <Col key={card.id} md={4} style={{ margin: "auto" }}>
//       <Card.Body className="homeCard">
//         <Card.Img
//           style={{
//             width: "300px",
//             height: "300px",
//             borderRadius: "10%",
//           }}
//           className="homeImg"
//           src={card.imageUrl}
//           alt="First slide"
//         />
//         <div className="homeTextBox">
//           <Card.Title>{card.fullName}</Card.Title>
//           <Card.Text>{card.userType}</Card.Text>
//           <Card.Text>
//             Available from {card.availableFrom} to {card.availableTo}
//           </Card.Text>
//         </div>
//       </Card.Body>
//     </Col>
//   ));
// };

// return (
//   <>
//     <Row>
//       <h1 className="homeHeader">Players Near You</h1>
//     </Row>
//     <Row>{renderCards().slice(0, 4)}</Row>
//     <Row>{renderCards().slice(4, 8)}</Row>
//     {displayCards.length < users.length && (
//       <Button variant="primary" onClick={() => setShowMore(true)}>
//         Show More
//       </Button>
//     )}
//   </>
// );
