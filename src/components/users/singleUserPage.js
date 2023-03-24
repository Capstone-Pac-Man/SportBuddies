import React, { useState, useEffect } from "react";
import {Button, Card, Container, Row, Col, Badge, Offcanvas} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUserAysnc,
  SingleUserProfile,
} from "../../reducers/singleUserSlice";
import ListGroup from "react-bootstrap/ListGroup";

export const SingleUserPage = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const player = useSelector(SingleUserProfile);
  const id = props.playerId


  useEffect(() => {
    dispatch(fetchSingleUserAysnc(id));
  }, [dispatch, id]);

  if (!player.fullName) return <h1>Loading...</h1>;

  return (
    <Container>
      <Button className='myBtn' onClick={handleShow}>
        See details
      </Button>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {player.fullName} {" "}
              <Badge pill className="mb-1" bg="warning">
                {player.userType}
              </Badge>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <img
              width ="360"
              height= "480"
              borderRadius= "10%"
              src={player.imageUrl}
              alt="player"
            />
            <p>Available from: {player.availableFrom} to {player.availableTo}</p>
            <p>State: {player.state}</p>
              <ListGroup className="list-group-flush">
                {player.sports.map((sport) => {
                  return (
                    <ListGroup.Item key={sport.id}>
                      <div>
                        <h4>{sport.name}</h4>
                        <div className="d-flex justify-content-between">Skill Level:
                        <Badge pill className="mb-1" bg="primary">
                           {sport.userSport.skillLevel}
                        </Badge>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">Status: {sport.userSport.status === 'active' ? 
                        <Badge pill bg="success">
                          {sport.userSport.status}
                        </Badge> : 
                        <Badge pill bg="danger">
                          {sport.userSport.status}
                        </Badge> 
                      }
                    </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
      </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};
