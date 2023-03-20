import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// venue model has: name, type, addr, city, state, description, hours.

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllVenuesAsync = createAsyncThunk(
  "venues/getAll",
  async () => {
    try {
      const { data } = await instance.get("/api/venues");
      return data;
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
    builder.addCase(fetchAllVenuesAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});
export const selectVenues = (state) => state.venues;

export default venuesSlice.reducer;
