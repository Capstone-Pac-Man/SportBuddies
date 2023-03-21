import { auth } from "../../config/firebase";
import React , { useEffect, useState } from "react";
import { Container, Row, Card, Form } from "react-bootstrap";
import { VenuesBox } from "./venuesBox";
import { PlayersBox } from "./playersBox";
import { EquipmentsBox } from "./equipmentBox";

export const HomePage = () => {

  return (
    <div >
      <Container fluid >
        <Row className="home"
          style={{
            height: "50vh",
          }}
        >
          <Form style={{width:"10%"}}>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter Zip Code" />
            </Form.Group>
          </Form>
        </Row>
        <Row style={{
            height: "50vh",
          }}>
          <VenuesBox />
        </Row>
        <Row style={{
            height: "50vh",
          }}>
          <PlayersBox />
        </Row>
        {/* <EquipmentsBox /> */}
      </Container>
    </div>
  );
};
