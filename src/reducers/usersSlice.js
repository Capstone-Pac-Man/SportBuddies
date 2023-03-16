import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});


export const fetchAllUsersAsync = createAsyncThunk(
    "users/fetchAll",
    async () => {
      try {
        const { data } = await instance.get(`/api/users/`);
        return data;
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