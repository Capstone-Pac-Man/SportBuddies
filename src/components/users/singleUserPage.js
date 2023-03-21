import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleUserAysnc,
  SingleUserProfile,
} from "../../reducers/singleUserSlice";
import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export const SingleUserPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const player = useSelector(SingleUserProfile);
  console.log("PLAYER", player);

  useEffect(() => {
    dispatch(fetchSingleUserAysnc(id));
  }, [dispatch]);

  if (!player.name) return <h1>Loading...</h1>;

  return (
    <Container>
      <Row>
        <Col md={4} className="mb-5">
          <Card>
            <Card.Header className="d-flex mb-2 justify-content-between">
              <p>{player.name}</p>
              <p>{player.distance}</p>
            </Card.Header>
            <Card.Img
              style={{
                width: "50%",
                height: "50%",
                borderRadius: "10%",
              }}
              src={player.imageUrl}
            />
          </Card>
        </Col>
        <Col md={8} className="mb-5">
          <Card>
            <Card.Header>State: {player.state}</Card.Header>
            <Card.Body>
              <Card.Text className="d-flex mb-2 justify-content-between">
                Available from: {player.availableFrom} to {player.availableTo}
                <Badge pill className="mb-1" bg="warning">
                  {player.userType}
                </Badge>
              </Card.Text>
              <ListGroup className="list-group-flush">
                {player.sports.map((sport) => {
                  return (
                    <ListGroup.Item key={sport.id}>
                      <div className="d-flex mb-2 justify-content-between">
                        {sport.name}
                        <Badge pill className="mb-1" bg="primary">
                          <div>Skill Level: {sport.userSport.skillLevel}</div>
                        </Badge>
                      </div>
                      <div>Status: {sport.userSport.status}</div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
