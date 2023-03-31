import React, { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import { auth } from "../../config/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";

export const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  if (!auth.currentUser) return "Loading";

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    oldPassword
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, password);
      toast.success("Password updated successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Error updating password", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console(error);
    }
    handleClose();
  };

  const handleClose = () => {
    setShow(false);
    setOldPassword("");
    setPassword("");
  };
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="btn-sm btn-dark" onClick={handleShow}>
        Change Password
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old password"
                autoFocus
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password. Minimum: 8 characters"
                autoFocus
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="myBtn"
            type="submit"
            onClick={handleSubmit}
            disabled={!oldPassword || !password}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};
