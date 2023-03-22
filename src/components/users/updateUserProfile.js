import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {
    fetchOneUserAsync,
    selectUser,
    editUserAsync,
  } from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { UploadPfp } from "./uploadPfp";

export const UpdateUser = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useSelector(selectUser);
  const uid = user.uid

  useEffect(() => {
    setImageUrl(user.imageUrl)
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setMobile(user.mobile);
    setAddress(user.address)
  }, [user]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      editUserAsync( {firstName, lastName, email, mobile, address, uid })
    );    
    handleClose()
    // navigate("/dashboard")
  };

  

    

  return (
    <>
        <Button variant="primary" onClick={handleShow}>
            Update
        </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
            {imageUrl && <img src={imageUrl} alt="Selected file" className="img-fluid rounded-start" style={{width:"240px"}}/>}
            <UploadPfp uid={user.uid} />
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="first name"
                autoFocus
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="last name"
                autoFocus
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@mail.com"
                autoFocus
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="10 digit number"
                autoFocus
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="address"
                autoFocus
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
