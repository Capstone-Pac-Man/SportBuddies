import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync, selectUsers } from "../../reducers/usersSlice";
import MultiCarousel from "./multiCarousel";
import PlayerCard from "./playerCard";
import "react-multi-carousel/lib/styles.css";
import Loading from "../../assets/Loading";

export const PlayersBox = ({ location }) => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch, location]);

  if (users.loading) return <Loading />;
  const items = users.map((e) => {
    return <PlayerCard key={e.id} player={e} />;
  });

  return (
    <>
      <h1 className="homeHeader">Players Near You</h1>
      {users.length === 0 ? (
        <div>
          <h3 style={{ marginTop: 50 }} className="text-center">
            No available players near you.
          </h3>
          <p className="text-center text-muted">(Try changing your location)</p>
        </div>
      ) : (
        <div
          style={{ width: "100%", paddingBottom: 50 }}
          className="multi-list">
          <MultiCarousel style={{ display: "flex" }} items={items} />
        </div>
      )}
    </>
  );
};
