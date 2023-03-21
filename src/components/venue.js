// *SINGLE* VENUE COMPONENT

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVenue, selectVenue } from "../reducers/venueSlice";
import { useParams } from "react-router-dom";

export const Venue = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const venue = useSelector(selectVenue);
  useEffect(() => {
    dispatch(fetchVenue(id));
  }, [dispatch]);

  return (
    <>
      <h1>
        <u>VENUE #{id}</u>
      </h1>{" "}
{venue && venue.name ? (
        <>
          <div>
            {venue.name}: {venue.address}
            <br></br>
            <img
              src={venue.imageUrl}
              height="158"
              width="273"
              alt="ozymandias"
            ></img>
          </div>
          <div>
            <h4>SPORTS OFFERED:</h4>
            {venue.sports && venue.sports[0] ? (
              <div>
                <ul>
                  {venue.sports.map((sport) => {
                    return <li key={sport.name}>{sport.name}</li>;
                  })}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div>No venue exists with id = {id}</div>
      )}
    </>
  );
};

export default Venue;

