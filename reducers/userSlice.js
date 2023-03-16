// ## JW
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* user model has name, email, imageUrl, mobile, availableFrom, 
availableTo,address, city, country and userType. */

export const fetchAllUsersAsync = createAsyncThunk(
  "users/fetchAll",
  async () => {
    try {
      const { data } = await axios.get(`/api/users/`);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchOneUserAsync = createAsyncThunk(
  "users/fetchOne",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/users/me`);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const createOneUserAsync = createAsyncThunk(
  "users/createOne",
  async (id) => {
    try {
      const { data } = await axios.post(`/api/users/`);
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
    const { data } = await axios.put(`/api/users/me`, {
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
    builder.addCase(fetchOneUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

/* This is a function we will pass to useSelector in our component,
to read values from our specific slice of redux state. */
export const selectUser = (state) => state.user;
// this is the same "user" that is stuck to the name property in userSlice.

export default userSlice.reducer;
