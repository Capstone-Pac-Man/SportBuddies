import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import {
  fetchOneUserAsync,
  selectUser,
} from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { UpdateUser } from "./updateUserProfile";

import { Container, Accordion, Col, Card, Button, Table } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddUserSport } from "./addUserSport";
import { signOut } from "firebase/auth";


export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  console.log(user)

  const isAuth = localStorage.getItem("auth");
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(fetchOneUserAsync(uid));
      }
    });
  }, []);
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchOneUserAsync());
    } else {
      signOut(auth);
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (user.error === "error") {
      navigate("/login");
    }
  }, [user]);

  if (!user) return "Loading";

  return (
    <>
      <Container>
        <Col>
          <h1> Welcome, {user.fullName}!</h1>
          <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Personal Information 
                <UpdateUser />
                <Button variant="primary" onClick={()=> navigate("/change_password")}>
                Change Password
                </Button>
              </Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between">
                  <div className="ml-auto">
                    <Card.Img src={user.imageUrl} className="img-fluid rounded-start "style={{width:"240px"}} alt="avatar"></Card.Img>
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
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Sports
                <AddUserSport/>
              </Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover size="lg">
                  <thead>
                    <tr>
                      <th>Sport</th>
                      <th>Skill Level</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                    <tbody>
      
                      {user.sports ? Object.values(user.sports).map((elem)=>{
                        return (
                          <tr key={elem.id}>
                            <td>{elem.name}</td>
                            <td>{elem.userSport.skillLevel}</td>
                            <td>{elem.userSport.status}</td>
                          </tr>
                        )
                      }) : (
                        <h1>Loading</h1>
                      )}
                    </tbody>
                  </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>     
        </Col>
      </Container>
    </>
  );
};

export default UserProfile;
