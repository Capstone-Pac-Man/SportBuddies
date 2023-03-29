import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const fetchAllMessagesInConvo = createAsyncThunk(
  "messaages/fetchAll",
  async (id) => {
    try {
      console.log("INSIDE fetch", id);
      const { data } = await instance.get(`/api/message/${id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ id, name, text, convoId }) => {
    try {
      console.log(id, name, text, convoId);

      const { data } = await instance.post(`/api/message/${convoId}`, {
        userId: id,
        senderName: name,
        text: text,
      });

      console.log(data);

      return data;
    } catch (e) {}
  }
);
export const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMessagesInConvo.fulfilled, (state, { payload }) => {
      console.log("MESSAGE PAYLOAD", payload);
      return payload;
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
      console.log(payload);
      return payload;
    });
  },
});

export const allMessages = (state) => state.messages;

export default messageSlice.reducer;
