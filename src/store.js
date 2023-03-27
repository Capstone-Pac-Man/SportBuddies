import { configureStore } from "@reduxjs/toolkit";
import sportSlice from "./reducers/sportSlice";
import sportsSlice from "./reducers/sportsSlice";
import userSlice from "./reducers/userSlice";
import usersSlice from "./reducers/usersSlice";
import venueSlice from "./reducers/venueSlice";
import venuesSlice from "./reducers/venuesSlice";
import singleUserSlice from "./reducers/singleUserSlice";
import venueAuthSlice from "./reducers/venueAuthSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    venue: venueSlice,
    venues: venuesSlice,
    sport: sportSlice,
    sports: sportsSlice,
    singleUser: singleUserSlice,
    auth: venueAuthSlice
  },
});

export default store;
export * from "./reducers/venueAuthSlice";
