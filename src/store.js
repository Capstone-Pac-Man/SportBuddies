import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import usersSlice from "./reducers/usersSlice";
import venueSlice from "./reducers/venueSlice";
import venuesSlice from "./reducers/venuesSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		users: usersSlice,
		venue: venueSlice,
		venues: venuesSlice
	},
});


export default store;