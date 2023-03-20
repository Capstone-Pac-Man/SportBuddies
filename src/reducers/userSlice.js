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

export const signUpThunk = createAsyncThunk(
  "users/createUser",
  async ({ name, email, state, zipcode, uid }) => {
    try {
      const { data } = await instance.post(`/api/users/`, {
        name: name,
        email: email,
        state: state,
        zipcode: zipcode,
        uid: uid,
      });
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
    uid,
  }) => {
    console.log("UID IN SLLICE", uid);

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
      uid: uid,
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
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
