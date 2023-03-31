import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import {
  selectVenueAuth,
  changeVenuePasswordAsync,
} from "../../reducers/venueAuthSlice";

export const ChangeVenuePassword = () => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const venue = useSelector(selectVenueAuth);
  const venueId = venue.id;
  const email = venue.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        changeVenuePasswordAsync({ email, password, newPassword, venueId })
      );
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
    setPassword("");
    setNewPassword("");
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password. Minimum: 8 characters"
                autoFocus
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            disabled={!newPassword || !password}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};
