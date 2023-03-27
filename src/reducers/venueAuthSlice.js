import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from '../history'
import { useNavigate } from "react-router-dom";



const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });


const TOKEN = 'token'
const SET_AUTH = 'SET_AUTH'

const setAuth = auth => ({type: SET_AUTH, auth})

export const fetchOneVenueAsync = createAsyncThunk(
    "venues/fetchOne",
    async () => {
        try {
            const token = window.localStorage.getItem(TOKEN)
            if (token) {
                const {data} = await instance.get('/api/auth/me', {
                  headers: {
                    authorization: token
                  }
                })
                return data
            }
        } catch (error) {
            throw new Error(error);
        }
    }

)

export const authenticateLogin = createAsyncThunk(
    "venues/loginVenue",
    async ({email, password}, thunkAPI) => {
        try {
            const {data} = await instance.post("/api/auth/login", {email, password})
            window.localStorage.setItem(TOKEN, data.token)
            thunkAPI.dispatch(fetchOneVenueAsync());
        } catch (error) {
            console.log(error)
        }
    }
)

export const authenticateRegister = createAsyncThunk(
    "venues/createVenue",
    async ({name, email, password, type, address, city, state, hours}, thunkAPI) => {
        try {
            const {data} = await instance.post("/api/auth/register", { 
                name: name, 
                email: email, 
                password: password, 
                type: type, 
                address: address,
                city: city,
                state: state,
                hours: hours 
            })
            window.localStorage.setItem(TOKEN, data.token)
            thunkAPI.dispatch(fetchOneVenueAsync());
        } catch (error) {
            console.log(error)
        }
    }
)

export const logout = createAsyncThunk(
    "venues/logout",
    async () => {
        try {
            window.localStorage.removeItem(TOKEN)
            history.push('/venue/login')
            // return {} 
        } catch (error) {
            console.log(error)
        }
    }
)

export const addVenueSportAsync = createAsyncThunk(
    "venue/addSport",
    async ({ venueId, sportId }) => {
      try {
        const { data } = await instance.post("/api/auth/me/sports", {
            venueId: venueId,
            sportId: sportId
        });
        return data;
      } catch (e) {
        console.log(e);
      }
    }
);

export const deleteVenueSportAsync = createAsyncThunk(
    "venue/deleteSport",
    async ({ venueId, sportId }) => {
        try {
            console.log("THUNK V ID", venueId)
            console.log("THUNK Sport ID", sportId)
            const { data } = await instance.put(`/api/auth/me/sports`, {
                venueId: venueId,
                sportId: sportId
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

const venueAuthSlice = createSlice({
    name: "venueAuth",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchOneVenueAsync.fulfilled, (state, { payload }) => {
          return payload;
        })
      builder.addCase(authenticateLogin.fulfilled, (state, { payload }) => {
        return payload;
      });
      builder.addCase(authenticateRegister.fulfilled, (state, { payload }) => {
        return payload;
      });
      builder.addCase(addVenueSportAsync.fulfilled, (state, { payload }) => {
        return payload;
      });
      builder.addCase(deleteVenueSportAsync.fulfilled, (state, { payload }) => {
        // console.log("PAYLOAD ID", payload)
        return Object.keys(state).filter((sport) => sport.id !== payload.id);
        // return payload
      });
    },
  });

export const selectVenueAuth = (state) => state.auth;

export default venueAuthSlice.reducer;




// export default function(state = {}, action) {
//   switch (action.type) {
//     case SET_AUTH:
//        return action.auth
//     default:
//       return state
//   }
// }