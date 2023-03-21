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
        <div>
          {venue.name}: {venue.address}
          <br></br>
          <img src={venue.imageUrl} height="158" width="273"></img>
        </div>
      ) : (
        <div>No venue exists with id = {id}</div>
      )}
    </>
  );
};

export default Venue;
