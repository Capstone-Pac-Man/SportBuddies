// ## JW
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

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
      const { data } = await instance.get(`/api/users/me`);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "users/createUser",
  async ({ firstName, lastName, email, state, zipcode, uid }) => {
    try {
      const { data } = await instance.post(`/api/users/`, {
        firstName: firstName,
        lastName: lastName,
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

export const addUserSportAsync = createAsyncThunk(
  "user/addSport",
  async ({ sportId, skillLevel, userId, status }) => {
    try {
      const { data } = await instance.post("/api/users/me/sports", {
        sportId: sportId,
        skillLevel: skillLevel,
        userId: userId,
        status: status,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteUserSportAsync = createAsyncThunk(
  "user/deleteSport",
  async ({ sportId }) => {
    const { data } = await instance.delete(`/api/users/me/sports/${sportId}`);
    return data;
  }
);

/* user model has name, email, imageUrl, mobile, availableFrom, 
availableTo,address, city, country and userType. */

export const editUserAsync = createAsyncThunk(
  "users/editOne",
  async ({
    firstName,
    lastName,
    email,
    imageUrl,
    mobile,
    availableFrom,
    availableTo,
    address,
    city,
    state,
    country,
    userType,
    uid,
    sportId,
    skillLevel,
    status,
  }) => {
    console.log("UID IN SLLICE", uid);

    const { data } = await instance.put(`/api/users/me`, {
      firstName,
      lastName,
      email,
      imageUrl,
      mobile,
      availableFrom,
      availableTo,
      address,
      city,
      state,
      country,
      userType,
      uid: uid,
      sportId,
      skillLevel,
      status,
    });
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneUserAsync.fulfilled, (state, { payload }) => {
        return payload;
      })
      .addCase(fetchOneUserAsync.rejected, (state, { payload }) => {
        localStorage.removeItem("auth");
        signOut(auth);
        return { error: "error" };
      });
    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      localStorage.setItem("auth", true);
      return action.payload;
    });
    builder.addCase(addUserSportAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteUserSportAsync.fulfilled, (state, { payload }) => {
      return Object.keys(state).filter((sport) => sport.id !== payload.id);
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
