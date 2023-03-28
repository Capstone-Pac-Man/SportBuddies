import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllUserConversations = createAsyncThunk(
  "conversation/fetchAll",
  async (id) => {
    try {
      console.log("INSIDE fetch", id);
      const { data } = await instance.get(`/api/conversation/${id}`);
      console.log("DAT@@@@", data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const addUserConversation = createAsyncThunk(
  "conversation/addUserConvo",
  async ({ userId, id }) => {
    try {
      const { data } = await instance.post(`/api/conversation/${userId}`, {
        id,
      });

      console.log("DATAAA", data);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllUserConversations.fulfilled,
      (state, { payload }) => {
        state.push(...payload);
      }
    );
    builder.addCase(addUserConversation.fulfilled, (state, { payload }) => {
      console.log(payload);

      state.push(payload);
      return state;
    });
  },
});

export const selectConversations = (state) => state.conversations;

export default conversationSlice.reducer;
