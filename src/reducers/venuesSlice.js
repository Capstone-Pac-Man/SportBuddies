import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// venue model has: name, type, addr, city, state, description, hours.

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllVenuesAsync = createAsyncThunk(
  "venues/getAll",
  async (filters) => {
    try {
      if (sessionStorage.getItem("location")) {
        const coords = JSON.parse(sessionStorage.getItem("location"));
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        const { data } = await instance.get("/api/venues", {
          params: {
            latitude: latitude,
            longitude: longitude,
            filters: filters,
          },
        });
        return data;
      } else {
        const { data } = await instance.get("/api/venues", {
          params: { filters: filters },
        });
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const venuesSlice = createSlice({
  name: "venues",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVenuesAsync.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(fetchAllVenuesAsync.pending, (state, { payload }) => {
        return { loading: "loading" };
      });
  },
});
export const selectVenues = (state) => state.venues;

export default venuesSlice.reducer;
