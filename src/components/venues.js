import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVenuesAsync, selectVenues } from "../reducers/venuesSlice";

export const Venues = () => {
  const dispatch = useDispatch();
  const venues = useSelector(selectVenues);
  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch]);

/*  const venues = [
    "Colter's Court",
    "Frank's Field",
    "Rachel's Rink",
    "Pavel's Pool",
    "Travis's Track",
  ]; */

  
  return (
    <>
      <h1>
        <u>VENUES</u>
      </h1>{" "}
      {venues && venues[0] ? (
        <div>
          <ul>
            {venues.map((venue) => {
              return(                 
                <li key={venue}>
                  {venue.name}: {venue.address}<br><br>
                  <img src={venue.imageUrl} height="158" width="273"></img></li>)

            })}
          </ul>
        </div>
      ) : (
        <div>No venues to show.</div>
      )}
    </>
  );
};

export default Venues;
