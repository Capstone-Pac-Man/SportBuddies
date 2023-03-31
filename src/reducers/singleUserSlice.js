import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const instance = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
});

export const fetchSingleUserAysnc = createAsyncThunk(
	"singleUser/getOne",

	async (id) => {
		try {
			const { data } = await instance.get(`/api/users/${id}`);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

const singleUserSlice = createSlice({
	name: "singleUser",
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSingleUserAysnc.fulfilled, (state, { payload }) => {
			return payload;
		});
	},
});

export const SingleUserProfile = (state) => state.singleUser;
export default singleUserSlice.reducer;
