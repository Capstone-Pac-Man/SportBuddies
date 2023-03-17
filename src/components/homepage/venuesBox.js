import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import { fetchAllVenuesAsync, selectVenues } from "../../reducers/venuesSlice";

export const VenuesBox = () => {
  const dispatch = useDispatch()
  const venues = useSelector(selectVenues)
  console.log("VENUES",venues)

  useEffect(()=>{
    dispatch(fetchAllVenuesAsync())
  }, [dispatch])

  if (!venues.length) return "Loading. Please wait";

  return (
    <div>
      <h1 className="homeHeader">Venues</h1>
      <Carousel style={{height: "250px", marginBottom: "50px"}}>
        {[0, 3].map((startIndex) => (
          <Carousel.Item key={startIndex} className="carouselHome">
            <div className="d-flex justify-content-evenly">
              {venues.slice(startIndex, startIndex + 3).map((venue) => (
                <div key={venue.id}>
                  <Card.Body className="homeCard">
                    
                    <Card.Img
                      style={{
                        width: "400px",
                        height: "210px",
                      }}
                      className="homeImg"
                      src={venue.imageUrl}
                      alt="First slide"
                    />
                    <div className="homeTextBox">
                    <Card.Title>{venue.name}</Card.Title>
                    <Card.Text>{venue.description}</Card.Text>
                    </div>
                  </Card.Body>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
