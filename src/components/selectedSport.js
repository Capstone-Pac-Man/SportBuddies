import React, {useEffect} from "react";
import { Container, Row, Figure, Col, Card, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import {fetchAllRelatedToSportAsync, selectSport} from "../reducers/sportSlice"

export const SelectedSport = () => {
    const dispatch = useDispatch()
    const { sport } = useParams()
    console.log("use params", sport)
    

    const sportObj = useSelector(selectSport)
    //const name = sport.sport.name;

    console.log("SPORT", sportObj.venues)
    // let venues = []
    // let results = [];
    // for (const element of sportObj) {
    //     venues.push(element)
    // }
    // console.log("VENUES", venues)
 
    useEffect(()=> {
        dispatch(fetchAllRelatedToSportAsync(sport))
    }, [dispatch, sport])


    if (!sportObj) return "Loading. Please wait";

    return(
        <Container>
            <Row style={{marginBottom : "150px"}}> 
            <div className="d-flex justify-content-evenly"> 
                {sportObj.venues ? (
                    sportObj.venues.map((venue) => 
                    <Card.Body key={venue.id} style={{ width: '18rem' }}>
                        <Card.Img 
                            // width={180}
                            // height={180}
                            alt="Sport arena"
                            src={venue.imageUrl}
                            style={{ width: "240px", height: "180px", objectFit: "cover",borderRadius: "10%" }}
                        />
                        <Card.Text>
                            {venue.name}
                        </Card.Text>
                    </Card.Body>
                        )) : (
                            <h1>Loading Please wait</h1>
                        )
                    } 
            </div>
            </Row>
            <Row>
                {sportObj.users ? (
                    <div className="d-flex justify-content-evenly"> 
                        {/* {sportObj.users.slice(startIndex, startIndex + 4).map((user) => ( */}
                        {sportObj.users.map((user) => (
                            <div key={user.id} >
                            <Card.Body className="homeCard">
                                <Card.Img 
                                src={user.imageUrl}
                                style={{ width: "300px", height: "480px", objectFit: "cover",borderRadius: "10%" }}
                                alt="Image"
                                className="homeImg"
                                
                                />
                                <div className="homeTextBox">
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>{user.userType}</Card.Text>
                                <Card.Text>Available from {user.availableFrom} to {user.availableTo}</Card.Text>
                                </div>
                            </Card.Body>
                            </div>
                        ))}
                    </div>          
                ) : (
                    <h1>Loading Please wait</h1>
                )
            } 
            </Row>
        </Container>
    )
}



