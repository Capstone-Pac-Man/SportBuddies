import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import {
  deleteUserSportAsync,
  fetchOneUserAsync,
  selectUser,
} from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { UpdateUser } from "./updateUserProfile";

import {
  Container,
  Accordion,
  Col,
  Card,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddUserSport } from "./addUserSport";
import { signOut } from "firebase/auth";
import { EditUserSport } from "./editUserSport";
import { ChangePassword } from "./changePassword";
import { editUserAsync } from "../../reducers/userSlice";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const isAuth = localStorage.getItem("auth");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchOneUserAsync());
      }
    });
  }, [dispatch]);
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchOneUserAsync());
    } else {
      signOut(auth);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user?.error) {
      navigate("/login");
    }
  }, [user]);

  const handleAvailable = (e) => {
    if (e.target.value === "remove") {
      dispatch(editUserAsync({ availableTo: 0 }));
    } else if (e.target.value === "add") {
      const twelveHoursFromNow = new Date(Date.now() + 12 * 60 * 60 * 1000);
      const obj = { availableTo: twelveHoursFromNow.getTime() };
      dispatch(editUserAsync(obj));
    }
  };
  if (!user) return "Loading";
  if (!user.sports) return "Loading";
  const currentTime = Date.now();
  const availableToTime = user.availableTo;
  const isAvailableToInFuture = availableToTime > currentTime;

  return (
    <>
      <Container>
        <Col>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
            }}>
            <h1> Welcome, {user.fullName}!</h1>
            {isAvailableToInFuture ? (
              <button
                className="btn btn-outline-danger btn-sm"
                value="remove"
                onClick={handleAvailable}
                style={{
                  marginTop: 5,
                  width: 130,
                  minHeight: 30,
                  height: "fit-content",
                }}>
                Make unavailable
              </button>
            ) : (
              <button
                className="btn btn-outline-success btn-sm"
                value="add"
                onClick={handleAvailable}
                style={{
                  marginTop: 5,
                  width: 130,
                  height: "fit-content",
                }}>
                Make available
              </button>
            )}
          </div>
          <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div>Personal Information</div>
                <UpdateUser />
                <ChangePassword />
              </Accordion.Header>
              <Accordion.Body>
                <div xs>
                  <div
                    className="d-flex justify-content-between"
                    style={{ flexWrap: "wrap" }}>
                    <div>
                      <Card.Img
                        src={user.imageUrl}
                        className="img-fluid rounded-start "
                        style={{ width: "240px", minWidth: "120px" }}
                        alt="avatar"></Card.Img>
                    </div>
                    <div className="justify-self-stretch">
                      <Table striped bordered hover size="lg">
                        <thead>
                          <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Zip Code</th>
                            <th>State</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.zipcode}</td>
                            <td>{user.state}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div>Sports</div>
                <AddUserSport />
              </Accordion.Header>
              <Accordion.Body>
                {!user.sports.length ? (
                  <h1>Please add your first sport</h1>
                ) : (
                  <Table striped bordered hover size="lg">
                    <thead>
                      <tr>
                        <th>Sport</th>
                        <th>Skill Level</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.sports ? (
                        Object.values(user.sports).map((elem) => {
                          return (
                            <tr key={elem.id}>
                              <td>{elem.name}</td>
                              <td>{elem.userSport.skillLevel}</td>
                              <td>
                                {elem.userSport.status === "active" ? (
                                  <Badge pill bg="success">
                                    {elem.userSport.status}
                                  </Badge>
                                ) : (
                                  <Badge pill bg="danger">
                                    {elem.userSport.status}
                                  </Badge>
                                )}
                              </td>
                              <td style={{ width: "25%" }}>
                                <EditUserSport
                                  currentSkill={elem.userSport.skillLevel}
                                  currentStatus={elem.userSport.status}
                                  sportId={elem.userSport.sportId}
                                  userId={elem.userSport.userId}
                                />
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  onClick={() =>
                                    dispatch(
                                      deleteUserSportAsync({
                                        sportId: elem.userSport.sportId,
                                      })
                                    )
                                  }>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <h1>Loading</h1>
                      )}
                    </tbody>
                  </Table>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Container>
    </>
  );
};

export default UserProfile;
