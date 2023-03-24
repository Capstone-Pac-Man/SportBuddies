import "./index.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import SignUp from "./components/UserAuth/SignUp";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./components/homepage/homepage";
import { SearchBar } from "./components/searchBarSports";
import { Venues } from "./components/venues";
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

function App() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(false);
  useEffect(() => {
    getLocation();
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
      <NavBar />
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
        <Route path="/search/:sport" element={<SelectedSport />} />
        <Route path="/chatroom" element={<Chatroom />} />
      </Routes>
      <div className="footer"></div>
    </div>
  );
}

export default App;
