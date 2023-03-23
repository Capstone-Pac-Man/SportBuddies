import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, Form, Row} from 'react-bootstrap';
import { editUserAsync, selectUser } from '../../reducers/userSlice';

export const EditUserSport = (props) => {
    // const {currentSkill, currentStatus, sportId } = props
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const [skillLevel, setSkillLevel] = useState("")
    const [status, setStatus] = useState("")
  
    const handleClose = () => {
        setShow(false);
        setSkillLevel("")
        setStatus("")
    }
    const handleShow = () => setShow(true);
  
    const user = useSelector(selectUser);
    const uid = user.uid
    const sportId = props.sportId

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(
        editUserAsync( {sportId, skillLevel, status, uid })
      );    
      handleClose()
    };
    


    return (
      <>
          <Button className='myBtn' onClick={handleShow}>
              Update
          </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Sport</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Row>
                    <Form.Label>Skill Level</Form.Label>
                </Row>
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
              <Form>
              <Form.Group>
                <Row>
                    <Form.Label>Status</Form.Label>
                </Row>
                <Form.Check
                    inline
                    label="active"
                    value={"active"}
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    onChange={(e) => setStatus(e.target.value)}
                    />
                  <Form.Check
                    inline
                    label="inactive"
                    value={"inactive"}
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    onChange={(e) => setStatus(e.target.value)}
                    />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className='myBtn' type='submit' onClick={handleSubmit} disabled={!skillLevel || !status}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }