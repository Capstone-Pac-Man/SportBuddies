import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading";

import {
  fetchAllRelatedToSportAsync,
  selectSport,
} from "../reducers/sportSlice";
import { SingleUserPage } from "./users/singleUserPage";
import Venue from "./venue";

export const SelectedSport = () => {
  const dispatch = useDispatch();
  const { sport } = useParams();
  const sportObj = useSelector(selectSport);

  useEffect(() => {
    dispatch(fetchAllRelatedToSportAsync(sport));
  }, [dispatch, sport]);

  if (sportObj.loading) return <Loading />;

  return (
    <Container fluid>
      <h1 className="homeHeader text-center" style={{ textAlign: "center" }}>
        {sport.toUpperCase()}
      </h1>
      <Row>
        <Col sm>
          <h1 className="homeHeader ">Venues</h1>
          {sportObj.venues.length > 0 ? (
            sportObj.venues.map((venue) => (
              // <Row>
              // <Col> */}
              <Card key={venue.id} className="player-card">
                <Card.Img
                  variant="top"
                  className="homeCard"
                  alt="Sport arena"
                  src={venue.imageUrl}
                  style={{ objectFit: "cover", aspectRatio: "2/3" }}
                />
                <Card.Body style={{ minWidth: "100%", display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      // flexDirection: "column",
                      width: "80%",
                    }}>
                    <Card.Title>{venue.name}</Card.Title>
                  </div>
                  <Venue venueId={venue.id} />
                </Card.Body>
              </Card>
              // </Col>
              // </Row>
            ))
          ) : (
            <div>
              <h4 style={{ marginTop: 50 }} className="text-center">
                No registered {sport} venues near you.
              </h4>
              <p className="text-center text-muted">
                (Try changing your location)
              </p>
            </div>
          )}
        </Col>

        <Col sm xxl={8}>
          <Row>
            <h1 className="homeHeader text-center">Players</h1>
            {sportObj.users.length > 0 ? (
              sportObj.users.map((user) => (
                <Card
                  style={{ maxWidth: 350 }}
                  key={user.id}
                  className="vertical-card">
                  {/* <Card className="homeCard"> */}
                  <Card.Img
                    src={user.imageUrl}
                    alt="Image"
                    className="homeCard"
                  />
                  <Card.Body style={{ minWidth: "100%", display: "flex" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "80%",
                      }}>
                      <Card.Title>{user.fullName}</Card.Title>
                    </div>
                    <SingleUserPage playerId={user.id} />
                  </Card.Body>
                  {/* </Card> */}
                </Card>
              ))
            ) : (
              <div>
                <h4 style={{ marginTop: 50 }} className="text-center">
                  No available {sport} players near you.
                </h4>
                <p className="text-center text-muted">
                  (Try changing your location)
                </p>
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
