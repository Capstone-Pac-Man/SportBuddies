import React, {useEffect, useState} from "react";
import { Container, Row, Figure, Col, Card, Carousel, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import {fetchAllRelatedToSportAsync, selectSport} from "../reducers/sportSlice"

export const SelectedSport = () => {
    const dispatch = useDispatch()
    const { sport } = useParams()
    const sportObj = useSelector(selectSport)
  
    useEffect(()=> {
        dispatch(fetchAllRelatedToSportAsync(sport))
    }, [dispatch, sport])

    if (!sportObj) return "Loading. Please wait";
    return(
        <Container>
            <Row 
            // style={{marginTop:"5%"}}
            > 
            <h1 className="homeHeader">{sport} venues</h1>
                {sportObj.venues ? (
                    sportObj.venues.map((venue) => 
                        <Col key={venue.id} style={{margin : "auto"}}>
                            <Card>
                            <Card.Body className="homeCard">
                            <Card.Img 
                            alt="Sport arena"
                            src={venue.imageUrl}
                            style={{ width: "240px", height: "180px", objectFit: "cover",borderRadius: "10%" }}
                            />
                            <Card.Text>
                            {venue.name}
                            </Card.Text>
                            <Card.Text>
                            {venue.address}, {venue.city}, {venue.state} 
                            </Card.Text>
                            <Card.Text>
                            {venue.hours}
                            </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>
                        )) : (
                            <h1>Loading Please wait</h1>
                        )
                    } 
            </Row>
            <Row 
            // style={{marginTop:"20%"}}
            >
            <h1 className="homeHeader">{sport} players</h1>
                {sportObj.users ? (
                        sportObj.users.map((user) => (
                            <Col key={user.id}>
                                <Card className="homeCard">
                            <Card.Body >
                                <Card.Img 
                                src={user.imageUrl}
                                style={{ width: "278px", height: "464px", objectFit: "cover",borderRadius: "10%"}}
                                alt="Image"
                                className="homeImg"
                                />
                                <div className="homeTextBox">
                                <Card.Title>{user.fullName}</Card.Title>
                                <Card.Text>{user.userType}</Card.Text>
                                <Card.Text>Available from {user.availableFrom} to {user.availableTo}</Card.Text>
                                </div>
                            </Card.Body>
                            </Card>
                            </Col>
                        ))      
                ) : (
                    <h1>Loading Please wait</h1>
                )
            } 
            </Row>
        </Container>
    )
}



