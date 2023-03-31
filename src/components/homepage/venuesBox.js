import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiCarousel from "./multiCarousel";
import PlayerCard from "./playerCard";
import { fetchAllVenuesAsync, selectVenues } from "../../reducers/venuesSlice";
import Loading from "../../assets/Loading";

export const VenuesBox = ({ location }) => {
  const dispatch = useDispatch();
  const venues = useSelector(selectVenues);

  useEffect(() => {
    dispatch(fetchAllVenuesAsync());
  }, [dispatch, location]);

  if (venues.loading) return <Loading />;
  const items = venues.map((e) => {
    return <PlayerCard key={e.id} player={e} />;
  });

  return (
    <>
      <h1 className="homeHeader" style={{ marginTop: 10 }}>
        Venues Near You
      </h1>
      {venues.length === 0 ? (
        <div>
          <h3 style={{ marginTop: 50 }} className="text-center">
            No registered venues near you.
          </h3>
          <p className="text-center text-muted">(Try changing your location)</p>
        </div>
      ) : (
        <div style={{ width: "100%" }} className="multi-list">
          <MultiCarousel style={{ display: "flex" }} items={items} />
        </div>
      )}
    </>
  );
};
