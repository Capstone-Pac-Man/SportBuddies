import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, Form } from "react-bootstrap";
import { selectUser, addUserSportAsync } from "../../reducers/userSlice";
import { selectSports } from "../../reducers/sportsSlice";

export const AddUserSport = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [sportId, setSportId] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  const handleClose = () => {
    setShow(false);
    setSportId("");
    setSkillLevel("");
  };
  const handleShow = () => setShow(true);

  const user = useSelector(selectUser);
  const dbSports = useSelector(selectSports);

  const userId = user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addUserSportAsync({ sportId, skillLevel, userId }));
    handleClose();
  };

  return (
    <>
      <Button
        className="btn-sm btn-dark"
        style={{ marginLeft: 12 }}
        onClick={handleShow}
      >
        Add Sports
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sports</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Select onChange={(e) => setSportId(e.target.value)}>
                <option>Choose your sport</option>
                {Object.values(dbSports).map((elem) => {
                  return (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Check
                inline
                label="beginner"
                value={"beginner"}
                name="group1"
                type="radio"
                id="inline-radio-1"
                onChange={(e) => setSkillLevel(e.target.value)}
              />
              <Form.Check
                inline
                label="intermediate"
                value={"intermediate"}
                name="group1"
                type="radio"
                id="inline-radio-1"
                onChange={(e) => setSkillLevel(e.target.value)}
              />
              <Form.Check
                inline
                label="advanced"
                value={"advanced"}
                name="group1"
                type="radio"
                id="inline-radio-1"
                onChange={(e) => setSkillLevel(e.target.value)}
              />
              <Form.Check
                inline
                label="pro"
                value={"pro"}
                name="group1"
                type="radio"
                id="inline-radio-1"
                onChange={(e) => setSkillLevel(e.target.value)}
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
            disabled={!skillLevel || !sportId}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
