import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllUsersAsync } from "../reducers/usersSlice";
import Card from "react-bootstrap/Card";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Collapse from "react-bootstrap/Collapse";
import { Squash as Hamburger } from "hamburger-react";
import { fetchAllSportsAsync } from "../reducers/sportsSlice";

export default function Players() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const sports = useSelector((state) => state.sports);
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
    dispatch(fetchAllSportsAsync());
  }, [dispatch]);
  const handleCheck = (e) => {
    const checkedCheckboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);
    console.log(checkedCheckboxes);
  };
  const handleClear = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleApply = () => {
    const arr = [];
    const checkboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    ).filter((checkbox) => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      const [id, skillLevel] = checkbox.id.split("-");
      if (skillLevel && id) {
        if (skillLevel === "all") {
          arr.push({ sportId: parseInt(id) });
        } else {
          arr.push({ sportId: parseInt(id), skillLevel: skillLevel });
        }
      }
    });
    if (arr.length > 0) {
      dispatch(fetchAllUsersAsync({ filters: JSON.stringify(arr) }));
    } else if (arr.length === 0) {
      dispatch(fetchAllUsersAsync());
    }

    console.log(arr);
  };
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
        <div className="filters-bar">
          <Hamburger toggled={open} toggle={setOpen} size={22} duration={0.3} />
          <Collapse in={open}>
            <div>
              <div className="sport-filters">
                {sports.length > 0
                  ? sports.map((e) => {
                      return (
                        <div key={e.id}>
                          {/* <Form.Check
                            inline
                            type="checkbox"
                            id={e.id}
                            label={`${e.name}`}
                            onChange={handleCheck}
                          ></Form.Check> */}
                          <h5
                            className="text-center"
                            style={{ marginBottom: 0 }}
                          >
                            {e.name}
                          </h5>
                          <ul style={{ listStyleType: "none" }}>
                            <li>
                              <Form.Check
                                type="checkbox"
                                id={`${e.id}-all`}
                                label="any skill level"
                              ></Form.Check>
                            </li>
                            <li>
                              <Form.Check
                                type="checkbox"
                                id={`${e.id}-beginner`}
                                label="beginner"
                              ></Form.Check>
                            </li>
                            <li>
                              <Form.Check
                                type="checkbox"
                                id={`${e.id}-intermediate`}
                                label="intermediate"
                              ></Form.Check>
                            </li>
                            <li>
                              <Form.Check
                                type="checkbox"
                                id={`${e.id}-advanced`}
                                label="advanced"
                              ></Form.Check>
                            </li>
                            <li>
                              <Form.Check
                                type="checkbox"
                                id={`${e.id}-pro`}
                                label="pro"
                              ></Form.Check>
                            </li>
                          </ul>
                        </div>
                      );
                    })
                  : "Loading..."}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ margin: "1rem" }}
                  onClick={handleClear}
                  className="btn btn-small btn-danger"
                >
                  Clear
                </Button>

                <Button
                  style={{ margin: "1rem" }}
                  onClick={handleApply}
                  className="btn btn-small btn-dark"
                >
                  Apply
                </Button>
              </div>
            </div>
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
