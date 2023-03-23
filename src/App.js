import "./index.css";
import React, { useEffect } from "react";
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

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/players/:id" element={<SingleUserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<UserProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/players" element={<Players />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:id" element={<Venue />} />
        <Route path="/search/:sport" element={<SelectedSport />} />
      </Routes>
    </div>
  );
}

export default App;
