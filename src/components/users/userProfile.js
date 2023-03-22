import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import {
  fetchOneUserAsync,
  selectUser,
  editUserAsync,
} from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { UploadPfp } from "./uploadPfp";
import { UpdateUser } from "./updateUserProfile";
import { Container, ListGroup, Col, Card, Button, Table } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(fetchOneUserAsync(uid));
      }
    });
  }, []);
  
  if (!user) return "Loading" 

  return (
    <>
      <Container>
        <Col>
          <h1> Welcome, {user.fullName}!</h1>
          <img src={user.imageUrl} className="img-fluid rounded-start "style={{width:"240px"}} alt="avatar"></img>
          <Card>
            <Card.Header>Personal Information 
              <UpdateUser />
            <Button variant="primary" onClick={()=> navigate("/change_password")}>
              Change Password
              </Button>
              </Card.Header>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                </tr>
              </tbody>
            </Table>
          </Card>      
        </Col>
      </Container>
    </>
  );
};

export default UserProfile;
