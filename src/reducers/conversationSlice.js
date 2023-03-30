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
      const { data } = await instance.get(`/api/conversation`);
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
      const { data } = await instance.post(`/api/conversation`, {
        otherId: id,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const fetchConversationMessages = createAsyncThunk(
  "conversations/fetchMessages",
  async (id) => {
    try {
      const { data } = await instance.get(`/api/conversation/${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const updateSelectedConvo = createAsyncThunk(
  "conversations/updateSelectedConvo",
  async ({ id, content }) => {
    try {
      const { data } = await instance.post(`/api/conversation/${id}`, {
        content: content,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    status: null,
    userConversations: [],
    singleConversation: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllUserConversations.fulfilled,
      (state, { payload }) => {
        state.userConversations = payload;
        state.status = null;
      }
    );
    builder.addCase(addUserConversation.fulfilled, (state, { payload }) => {
      state.singleConversation = payload;
      state.status = null;
    });
    builder.addCase(
      fetchConversationMessages.fulfilled,
      (state, { payload }) => {
        state.singleConversation = payload;
        state.status = null;
      }
    );
    builder.addCase(updateSelectedConvo.fulfilled, (state, { payload }) => {
      state.singleConversation = payload;
      state.status = null;
    });
    builder.addCase(fetchAllUserConversations.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(addUserConversation.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(fetchConversationMessages.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(updateSelectedConvo.pending, (state, { payload }) => {
      state.status = "loading";
    });
  },
});

export const selectConversations = (state) => state.conversations;

export default conversationSlice.reducer;
