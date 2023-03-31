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
import { useNavigate } from "react-router-dom";
import { addUserConversation } from "../../reducers/conversationSlice";
import { selectUser } from "../../reducers/userSlice";

export const SingleUserPage = (props) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("");
  const player = useSelector((state) => state.singleUser);
  const id = props.playerId;
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatch(fetchSingleUserAysnc(id));
    setShow(true);
  };
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const handleMessage = async (id) => {
    const userId = user.id;
    await dispatch(addUserConversation({ userId, id }));
    navigate("/chatroom");
  };

  // if (!user) return "Loading..";

  // useEffect(() => {
  //   dispatch(fetchSingleUserAysnc(id));
  // }, [dispatch]);

  useEffect(() => {
    if (player.availableTo) {
      const ms = parseInt(player.availableTo);
      const dateObj = new Date(ms);
      const time = dateObj.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      });
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString("default", { month: "short" });
      setTime(`${time} on ${month} ${day} `);
    }
  }, [player]);

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
          <p>Available until {time}</p>
          <ListGroup className="list-group-flush">
            {player.sports
              ? player.sports.map((sport) => {
                  return (
                    <ListGroup.Item key={sport.id}>
                      <div>
                        <div className="d-flex justify-content-center">
                          <div>
                            <h4>{sport.name}</h4>
                          </div>
                          <div>
                            <img
                              src={sport.imageUrl}
                              style={{ width: "16px", marginLeft: "2px" }}
                              alt="sport"></img>
                          </div>
                        </div>
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
          {!user || user.error ? (
            <h6>Sign in to message this player</h6>
          ) : (
            <Button
              onClick={() => {
                handleMessage(player.id);
              }}>
              Message This Player
            </Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
