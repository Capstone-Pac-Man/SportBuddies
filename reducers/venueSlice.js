import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchVenue = createAsyncThunk(
  "singleVenue/fetchOne",
  async (id) => {
    const { data } = await axios.get(`/api/venues/${id}`);
    return data;
  }
);
//////////
//////////
export const venueSlice = createSlice({
  name: "singleVenue",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVenue.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const selectVenue = (state) => state.venue;
export default venueSlice.reducer;
