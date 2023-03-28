import "./index.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import SignUp from "./components/UserAuth/SignUp";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./components/homepage/homepage";
import { SearchBar } from "./components/searchBarSports";
import Venues from "./components/venues";
import { Venue } from "./components/venue";
import Players from "./components/players";
import { SelectedSport } from "./components/selectedSport";
import { UserProfile } from "./components/users/userProfile";
import "react-toastify/dist/ReactToastify.css";
import { SingleUserPage } from "./components/users/singleUserPage";
import { Chatroom } from "./components/chat/chatroom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneUserAsync } from "./reducers/userSlice";
import axios from "axios";
import VenueSignUp from "./components/VenueAuth/SignUp";
import VenueLogin from "./components/VenueAuth/Login";
import VenueProfile from "./components/venues/venueProfile";
import PageNotFound from "./components/PageNotFound";
import { fetchOneVenueAsync, selectVenueAuth } from "./reducers/venueAuthSlice";

import ChatPage from "./components/chat/ChatPage";

function App() {
  const dispatch = useDispatch();
  const isVenueLoggedIn = useSelector((state) => !!state.auth.id);
  const navigate = useNavigate();
  console.log("isLOGGEDIN", isVenueLoggedIn);

  const [location, setLocation] = useState(false);
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    dispatch(fetchOneVenueAsync());
  }, []);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(storeLocation);
    } else {
      return;
    }
  };
  const storeLocation = async (coords) => {
    const { latitude, longitude } = coords.coords;
    const location = { latitude, longitude };
    sessionStorage.setItem("location", JSON.stringify(location));
    setLocation(true);
  };

  return (
    <div className="App">
      <NavBar location={location} setLocation={setLocation} />
      {/* {isVenueLoggedIn ? (
        <Routes>
          <Route
            path="/"
            element={<HomePage location={location} setLocation={setLocation} />}
          />
          <Route path="/players" element={<Players />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/search/:sport" element={<SelectedSport />} />
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path="venue/dashboard" element={<VenueProfile />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes> */}
      {/* ) : ( */}
      <Routes>
        <Route
          path="/"
          element={<HomePage location={location} setLocation={setLocation} />}
        />
        {/* <Route path="/players/:id" element={<SingleUserPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<UserProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/players" element={<Players />} />
        <Route path="/venues" element={<Venues />} />
        {/* <Route path="/venues/:id" element={<Venue />} /> */}
        <Route path="venue/dashboard" element={<VenueProfile />} />
        <Route path="/search/:sport" element={<SelectedSport />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="venue/signup" element={<VenueSignUp />} />
        <Route path="venue/login" element={<VenueLogin />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {/* )} */}
      <div className="footer"></div>
    </div>
  );
}

export default App;
