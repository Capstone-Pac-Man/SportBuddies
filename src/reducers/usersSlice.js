import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllUsersAsync = createAsyncThunk(
  "users/fetchAll",
  async (params) => {
    try {
      if (sessionStorage.getItem("location")) {
        const coords = JSON.parse(sessionStorage.getItem("location"));
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        if (!params) {
          const { data } = await instance.get(`/api/users/`, {
            params: {
              latitude: latitude,
              longitude: longitude,
            },
          });
          return data;
        } else {
          const { filters } = params;
          console.log(filters);
          const { data } = await instance.get(`/api/users/`, {
            params: {
              latitude: latitude,
              longitude: longitude,
              filters: filters,
            },
          });
          return data;
        }
      } else {
        if (!params) {
          const { data } = await instance.get(`/api/users/`);
          return data;
        } else {
          const { data } = await instance.get(`/api/users/`, {
            params: params,
          });
          return data;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
