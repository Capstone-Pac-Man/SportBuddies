import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllUserConversations = createAsyncThunk(
  "conversations/fetchAll",
  async (id) => {
    try {
      const { data } = await instance.get(`/api/conversation/${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const addUserConversation = createAsyncThunk(
  "conversations/addUserConvo",
  async ({ userId, id }) => {
    try {
      const { data } = await instance.post(`/api/conversation/${userId}`, {
        id,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const updateSelectedConvo = createAsyncThunk(
  "conversations/updateSelectedConvo",
  async (id) => {
    try {
      const { data } = await instance.put(`/api/conversation/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const conversationSlice = createSlice({
  name: "conversations",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllUserConversations.fulfilled,
      (state, { payload }) => {
        return payload;
      }
    );
    builder.addCase(addUserConversation.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const selectConversations = (state) => state.conversations;

export default conversationSlice.reducer;
