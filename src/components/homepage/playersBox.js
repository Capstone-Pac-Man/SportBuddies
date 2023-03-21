import React, { useEffect, useState } from "react";
import { Row, Card, Button, Col  } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync, selectUsers } from "../../reducers/usersSlice";

export const PlayersBox = () => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch()

  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  if (!users.length) return "Loading. Please wait";

  const displayCards = showMore ? users : users.slice(0, 8);

  const renderCards = () => {
    return displayCards.map(card => (
      <Col key={card.id} md={4} style={{margin:"auto"}}>
        <Card.Body className="homeCard">
          <Card.Img
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "10%"
            }}
            className="homeImg"
            src={card.imageUrl}
            alt="First slide"
          />
          <div className="homeTextBox">
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>{card.userType}</Card.Text>
            <Card.Text>Available from {card.availableFrom} to {card.availableTo}</Card.Text>
          </div>
        </Card.Body>
      </Col>
    ));
  };

  // return (
  //   <div>
  //     <h1 className="homeHeader">Players Near You</h1>
  //     <Carousel style={{height: "500px", marginTop:"40px"}} >
  //       {[0, 4].map((startIndex) => (
  //         <Carousel.Item key={startIndex} className="carouselHome">
  //           <div className="d-flex justify-content-evenly">
  //             {users.slice(startIndex, startIndex + 4).map((user) => (
  //               <div key={user.id} >
  //                 <Card.Body className="homeCard">
  //                   <Card.Img 
  //                     src={user.imageUrl}
  //                     style={{ width: "300px", height: "480px", objectFit: "cover",borderRadius: "10%" }}
  //                     alt="Image"
  //                     className="homeImg"
                    
  //                   />
  //                   <div className="homeTextBox">
  //                   <Card.Title>{user.name}</Card.Title>
  //                   <Card.Text>{user.userType}</Card.Text>
  //                   <Card.Text>Available from {user.availableFrom} to {user.availableTo}</Card.Text>
  //                   </div>
  //                 </Card.Body>
  //               </div>
  //             ))}
  //           </div>
  //         </Carousel.Item>
  //       ))}
  //     </Carousel>
  //   </div>
  // );
  return (
    <>
      <Row>
        <h1 className="homeHeader">Players Near You</h1>
      </Row>
      <Row>
        {renderCards().slice(0, 4)}
      </Row>
      <Row>
        {renderCards().slice(4, 8)}
      </Row>
      {displayCards.length < users.length && <Button variant="primary" onClick={() => setShowMore(true)}>Show More</Button>}
    </>
  );
};
