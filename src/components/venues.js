import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllVenuesAsync, selectVenues } from "../reducers/venuesSlice";
import { Link } from "react-router-dom";

export const Venues = () => {
  const dispatch = useDispatch();
  const venues = useSelector(selectVenues);
  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch]);
  
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
                  {venue.name}: {venue.address}
                  <br></br>
                  <br></br>
                  <Link
                    to={`/venues/${venue.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={venue.imageUrl}
                      alt="Dazzling photo of the venue"
                      height="158"
                      width="273"
                    ></img>
                  </Link>
                </li>
              );
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
