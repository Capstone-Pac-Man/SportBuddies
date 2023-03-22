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
          <Card>
            <Card.Header>Personal Information 
              <UpdateUser />
            <Button variant="primary" onClick={()=> navigate("/change_password")}>
              Change Password
              </Button>
              </Card.Header>
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
          </Card>     
          <Button style={{marginLeft: "20px"}}>Add Sports</Button> 
        </Col>
      </Container>
    </>
  );
};

export default UserProfile;
