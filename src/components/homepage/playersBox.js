import React, { useEffect } from "react";
import { Row, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync, selectUsers } from "../../reducers/usersSlice";


export const PlayersBox = () => {
  const dispatch = useDispatch()

  const users = useSelector(selectUsers)

  useEffect(()=>{
    dispatch(fetchAllUsersAsync())
  }, [dispatch])

  if (!users.length) return "Loading. Please wait";

  return (
    <div>
      <h1 className="homeHeader">Players</h1>
      <Carousel style={{height: "250px", marginBottom: "50px"}} >
        {[0, 4].map((startIndex) => (
          <Carousel.Item key={startIndex} className="carouselHome">
            <div className="d-flex justify-content-evenly">
              {users.slice(startIndex, startIndex + 4).map((user) => (
                <div key={user.id} >
                  <Card.Body className="homeCard">
                    <Card.Img 
                      src={user.imageUrl}
                      style={{ width: "240px", height: "180px", objectFit: "cover" }}
                      alt="Image"
                      className="homeImg"
                    
                    />
                    <div className="homeTextBox">
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>{user.userType}</Card.Text>
                    <Card.Text>Available from {user.availableFrom} to {user.availableTo}</Card.Text>
                    </div>
                  </Card.Body>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

