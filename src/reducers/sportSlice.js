import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllRelatedToSportAsync = createAsyncThunk(
  "sport/getInfo",
  async (sport) => {
    let response = {};
    try {
      console.log(sport);
      const { data } = await instance.get(`/api/sports/${sport}`);
      const userQuery = JSON.stringify([{ sportId: data.sport.id }]);
      const venueQuery = JSON.stringify([data.sport.name]);
      if (sessionStorage.getItem("location")) {
        const coords = JSON.parse(sessionStorage.getItem("location"));
        const users = await instance.get(`/api/users/`, {
          params: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            filters: userQuery,
          },
        });
        response.users = users.data;
        const venues = await instance.get(`/api/venues/`, {
          params: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            filters: venueQuery,
          },
        });
        response.venues = venues.data;
      } else {
        const users = await instance.get(`/api/users/`, {
          params: {
            filters: userQuery,
          },
        });
        response.users = users.data;
        const venues = await instance.get(`/api/venues/`, {
          params: {
            filters: venueQuery,
          },
        });
        response.venues = venues.data;
      }
      console.log("DATA", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
);

const sportSlice = createSlice({
  name: "sport",
  initialState: { venues: [], users: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRelatedToSportAsync.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(fetchAllRelatedToSportAsync.pending, (state, { payload }) => {
        return { loading: "loading" };
      });
  },
});

export const selectSport = (state) => state.sport;

export default sportSlice.reducer;
