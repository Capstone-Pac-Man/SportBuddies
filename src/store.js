import { configureStore } from "@reduxjs/toolkit";
import sportSlice from "./reducers/sportSlice";
import sportsSlice from "./reducers/sportsSlice";
import userSlice from "./reducers/userSlice";
import usersSlice from "./reducers/usersSlice";
import venueSlice from "./reducers/venueSlice";
import venuesSlice from "./reducers/venuesSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		users: usersSlice,
		venue: venueSlice,
		venues: venuesSlice,
		sport: sportSlice,
		sports: sportsSlice
	},
});

export default store;
