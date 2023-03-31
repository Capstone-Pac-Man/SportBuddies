import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
});

export const fetchAllMessagesInConvo = createAsyncThunk(
	"messaages/fetchAll",
	async (id) => {
		try {
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
			const { data } = await instance.post(`/api/message/${convoId}`, {
				userId: id,
				senderName: name,
				text: text,
			});

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
			return payload;
		});
		builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
			return payload;
		});
	},
});

export const allMessages = (state) => state.messages;

export default messageSlice.reducer;
