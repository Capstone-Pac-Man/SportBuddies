import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, Form} from 'react-bootstrap';
import { selectSports } from '../../reducers/sportsSlice';
import { selectVenueAuth, addVenueSportAsync } from '../../reducers/venueAuthSlice';

export const AddVenueSport = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const [sportId, setSportId] = useState("")
  
    const handleClose = () => {
        setShow(false);
        setSportId("")
    }
    const handleShow = () => setShow(true);
  
    const venue = useSelector(selectVenueAuth);
    const dbSports = useSelector(selectSports);
  
    const venueId = venue.id

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(
        addVenueSportAsync( {venueId, sportId })
      );    
      handleClose()
    };
  

    return (
      <>
          <Button className='myBtn' onClick={handleShow}>
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
                      <option key={elem.id} value={elem.id}>{elem.name}</option>
                      )}
                    )}
                  </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className='myBtn' type='submit' onClick={handleSubmit} disabled={!sportId}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }