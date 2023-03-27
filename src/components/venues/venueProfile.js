import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Col, Card, Table, Accordion} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {deleteVenueSportAsync, fetchOneVenueAsync, logout, selectVenueAuth} from '../../reducers/venueAuthSlice'
import { AddVenueSport } from './addVenueSport';


function VenueProfile() {
    const {id} = useSelector((state) => state.auth);
    const venue = useSelector(selectVenueAuth)
  	const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log("VENUE PROFILE", venue)

    useEffect(() => {
        dispatch(fetchOneVenueAsync());
    }, [dispatch, id]);

    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/")
    }
    if (!venue) return "Loadind. Please wait"
    if (!venue.sports) return "Loadind. Please wait";

  return (
    <>
      <Container>
        <Col>
          <h1> Welcome, {venue.name}!</h1>
          <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div>Business Information</div> 
                <Button onClick={handleLogout}>
                    Logout
                </Button>
              </Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-start text-align-center">
                  <div>
                    <div className="ml-auto">
                      <Card.Img src={venue.imageUrl} className="img-fluid rounded-start "style={{width:"512px"}} alt="avatar"></Card.Img>
                    </div>
                    <div className="justify-self-stretch">
                      <Table striped bordered hover size="lg">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Hours of operation</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{venue.name}</td>
                            <td>{venue.address}, {venue.city}, {venue.state}</td>
                            <td>{venue.email}</td>
                            <td>{venue.hours}</td>
                            <td>{venue.description}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header >
                <div>Sports Offered</div>
                <AddVenueSport/> 
              </Accordion.Header>
              <Accordion.Body>
                {!venue.sports.length ? (
                      <h1>Please add sports offered </h1>
                  ) : (
                <Table striped bordered hover size="lg">
                  <thead>
                    <tr>
                      <th>Sport</th>
                    </tr>
                  </thead>
                    <tbody>
                      {venue.sports ? Object.values(venue.sports).map((elem)=>{
                        return (
                          <tr key={elem.id}>
                            <td>{elem.name}</td>
                            <td>
                              <Button variant="danger" onClick={()=>
                                dispatch(deleteVenueSportAsync({
                                  venueId : elem.venueSports.venueId,
                                  sportId : elem.venueSports.sportId
                                }))
                              }>Delete</Button>
                            </td>
                          </tr>
                        )
                      }) : (
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
}

export default VenueProfile