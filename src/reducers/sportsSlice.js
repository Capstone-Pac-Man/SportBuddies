import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllSportsAsync = createAsyncThunk(
  "sports/getAll",
  async () => {
    try {
      const { data } = await instance.get("/api/sports");
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const sportsSlice = createSlice({
  name: "sports",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSportsAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});
export const selectSports = (state) => state.sports;

export default sportsSlice.reducer;
