// ## JW
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* user model has: name, email, imageUrl, mobile, availableFrom, 
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
  async () => {
    // does the above async need a parameter....?
    try {
      const { data } = await axios.get(`/api/users/me`);
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

/* MISSING: a thunk for this POST route:

router.post("/me/sports", async (req, res, next) => {
    const { sportId, skillLevel, id } = req.body;
    const user = await User.findByPk(id);
  
    await UserSport.create({
      userId: id,
      sportId: sportId,
      skillLevel: skillLevel,
    });
    const updatedUser = User.findByPk(user.id, {
      include: {
        model: UserSport,
      },
    });
  
    res.json(updatedUser);
  }); */

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
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
