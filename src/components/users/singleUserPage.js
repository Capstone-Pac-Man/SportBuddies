import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Badge,
  Offcanvas,
} from "react-bootstrap";
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
  const player = useSelector((state) => state.singleUser);
  const id = props.playerId;
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatch(fetchSingleUserAysnc(id));
    setShow(true);
  };

  // useEffect(() => {
  //   dispatch(fetchSingleUserAysnc(id));
  // }, [dispatch]);

  // if (!player.fullName) return <h1>Loading...</h1>;

  return (
    <>
      <button className="pill-button" onClick={() => handleShow()}>
        See details
      </button>
      <Offcanvas show={show} onHide={handleClose} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {player.fullName}{" "}
            <Badge pill className="mb-1" bg="warning">
              {player.userType}
            </Badge>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img
            className="img-fluid rounded-start"
            style={{ width: "360px" }}
            src={player.imageUrl}
            alt="player"
          />
          <p>State: {player.state}</p>
          <p>
            Available from: {player.availableFrom} to {player.availableTo}
          </p>
          <ListGroup className="list-group-flush">
            {player.sports
              ? player.sports.map((sport) => {
                  return (
                    <ListGroup.Item key={sport.id}>
                      <div>
                        <h4></h4>
                        {sport.name}
                        <div className="d-flex justify-content-between">
                          Skill Level:
                          <Badge pill className="mb-1" bg="primary">
                            {sport.userSport.skillLevel}
                          </Badge>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        Status:{" "}
                        {sport.userSport.status === "active" ? (
                          <Badge pill bg="success">
                            {sport.userSport.status}
                          </Badge>
                        ) : (
                          <Badge pill bg="danger">
                            {sport.userSport.status}
                          </Badge>
                        )}
                      </div>
                    </ListGroup.Item>
                  );
                })
              : "loading"}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
