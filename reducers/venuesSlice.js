// ## JW
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// venue model has: name, type, addr, city, state, description, hours.

export const fetchAllVenuesAsync = createAsyncThunk(
  "venues/getAll",
  async () => {
    try {
      const { data } = await axios.get("/api/venues");
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchVenueAsync = createAsyncThunk("venues/getOne", async (id) => {
  try {
    const { data } = await axios.get(`/api/venues/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const addVenueAsync = createAsyncThunk(
  "venues/add",
  async ({ name, type, address, city, state, description, hours }) => {
    const { data } = await axios.post("/api/products", {
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
    const { data } = await axios.delete(`/api/venues/${id}`);
    return data;
  }
);

export const editVenueAsync = createAsyncThunk(
  "venues/update",
  async ({ id, name, type, address, city, state, description, hours }) => {
    const { data } = await axios.put(`/api/venues/${id}`, {
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
export const venuesSlice = createSlice({
  name: "venues",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllVenuesAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
    //// This next one might be an issue...
    builder.addCase(fetchVenueAsync.fulfilled, (state, { payload }) => {
      state.singleVenue = payload;
    });
    ////
    ////
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
export const selectVenues = (state) => state.venues;

export default venuesSlice.reducer;
