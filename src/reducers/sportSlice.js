import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

export const fetchAllRelatedToSportAsync = createAsyncThunk(
    "sport/getInfo",
    async (sport) => {
      try {
        const { data } = await instance.get(`/api/sports/${sport}`);
        console.log("DATA", data)
        return data;
      } catch (e) {
        console.log(e);
      }
    }
  );


  const sportSlice = createSlice({
    name: "sport",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllRelatedToSportAsync.fulfilled, (state, { payload }) => {
            return payload;
        });
    },
  });
  
  export const selectSport = (state) => state.sport;
  
  export default sportSlice.reducer;