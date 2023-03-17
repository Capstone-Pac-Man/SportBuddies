// ## JW
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* user model has: name, email, imageUrl, mobile, availableFrom, 
availableTo,address, city, country and userType. */

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchOneUserAsync = createAsyncThunk(
  "users/fetchOne",
  async (val) => {
    // does the above async need a parameter....?
    try {
      console.log("THUNK VAL", val);
      const { data } = await instance.get(`/api/users/me`, {
        params: { uid: val },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async () => {
    try {
      const { data } = await instance.post(`/api/users/`);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

/* user model has name, email, imageUrl, mobile, availableFrom, 
availableTo,address, city, country and userType. */

export const editUserAsync = createAsyncThunk(
  "users/editOne",
  async ({
    name,
    email,
    imageUrl,
    mobile,
    availableFrom,
    availableTo,
    address,
    city,
    country,
    userType,
    id,
  }) => {
    const { data } = await instance.put(`/api/users/me`, {
      name,
      email,
      imageUrl,
      mobile,
      availableFrom,
      availableTo,
      address,
      city,
      country,
      userType,
      id,
    });
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOneUserAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
