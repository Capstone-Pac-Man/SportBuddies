import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchVenue = createAsyncThunk("venues/fetchOne", async (id) => {
  const { data } = await instance.get(`/api/venues/${id}`);
  return data;
});

export const addVenueAsync = createAsyncThunk(
  "venues/add",
  async ({ name, type, address, city, state, description, hours, }) => {
    const { data } = await instance.post("/api/venues", {
      name: name,
      type: type,
      address: address,
      city: city,
      state: state,
      description: description,
      hours: hours,
    });
    return data;
  }
);

export const deleteVenueAsync = createAsyncThunk(
  "venues/delete",
  async ({ id }) => {
    const { data } = await instance.delete(`/api/venues/${id}`);
    return data;
  }
);

export const editVenueAsync = createAsyncThunk(
  "venues/update",
  async ({ id, name, type, address, city, state, description, hours }) => {
    const { data } = await instance.put(`/api/venues/${id}`, {
      name: name,
      type: type,
      address: address,
      city: city,
      state: state,
      description: description,
      hours: hours,
    });
    return data;
  }
);

export const venueSlice = createSlice({
  name: "venue",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVenue.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(addVenueAsync.fulfilled, (state, { payload }) => {
      state.push(payload);
    });
    builder.addCase(deleteVenueAsync.fulfilled, (state, { payload }) => {
      return state.filter((venue) => venue.id !== payload.id);
    });
    builder.addCase(editVenueAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const selectVenue = (state) => state.venue;
export default venueSlice.reducer;
