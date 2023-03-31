import "./index.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import SignUp from "./components/UserAuth/SignUp";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./components/homepage/homepage";

import Venues from "./components/venues";

import Players from "./components/players";
import About from "./components/about";
import { SelectedSport } from "./components/selectedSport";
import { UserProfile } from "./components/users/userProfile";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";

import VenueSignUp from "./components/VenueAuth/SignUp";
import VenueLogin from "./components/VenueAuth/Login";
import VenueProfile from "./components/venues/venueProfile";
import PageNotFound from "./components/PageNotFound";
import { fetchOneVenueAsync } from "./reducers/venueAuthSlice";
import Sidebar from "./components/chat/Sidebar";
import Footer from "./components/Footer";
import socket from "./socket";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [location, setLocation] = useState(false);
  useEffect(() => {
    getLocation();
    dispatch(fetchOneVenueAsync());
    if (user.id) {
      socket.emit("makeRoom", { id: user.id });
    }
  }, []);
  useEffect(() => {}, [user]);
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
    <>
      <div className="wrapper">
        <NavBar location={location} setLocation={setLocation} />
        <Routes>
          <Route
            path="/"
            element={<HomePage location={location} setLocation={setLocation} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<UserProfile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/players" element={<Players />} />
          <Route path="/venues" element={<Venues />} />

          <Route path="venue/dashboard" element={<VenueProfile />} />
          <Route path="/search/:sport" element={<SelectedSport />} />
          <Route path="/chatroom" element={<Sidebar />} />
          <Route path="venue/signup" element={<VenueSignUp />} />
          <Route path="venue/login" element={<VenueLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <div className="footer"></div>
      </div>
      <Footer />
    </>
  );
}

export default App;
