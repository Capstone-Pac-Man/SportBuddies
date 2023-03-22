import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllUsersAsync } from "../reducers/usersSlice";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { Squash as Hamburger } from "hamburger-react";

export default function Players() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);
  console.log(open);
  // If no users, assume they are loading
  if (users.length === 0) {
    return (
      <h1 className="text-center" style={{ marginTop: "20vh" }}>
        Loading...
      </h1>
    );
  } else {
    // If there are users map them out into cards
    return (
      <div className="players-container">
        <h1 style={{ width: "100%", marginLeft: "1rem", fontWeight: 700 }}>
          Players
        </h1>
        <div className="text-center filters-bar">
          <Hamburger toggled={open} toggle={setOpen} size={22} duration={0.3} />
          <Collapse in={open}>
            <div className="sport-filters">dsada</div>
          </Collapse>
        </div>
        {users.map((e) => {
          return (
            <Card key={e.id} className="player-card">
              <Card.Img variant="top" src={e.imageUrl} />
              <Card.Body>
                <Card.Title>{e.fullName}</Card.Title>
                <Card.Subtitle className="text-muted">
                  {e.distance.toFixed(1)} miles away
                </Card.Subtitle>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}
