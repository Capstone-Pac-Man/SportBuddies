import "./index.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import SignUp from "./components/UserAuth/SignUp";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./components/homepage/homepage";
import { SearchBar } from "./components/searchBarSports";
import { Venues } from "./components/venues";
import { Venue } from "./components/venue";
import { SelectedSport } from "./components/selectedSport";
import { UserProfile } from "./components/users/userProfile";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/me" element={<UserProfile />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/venues/:id" element={<Venue />} />
        <Route exact path="/venues" element={<Venues />} />
        <Route exact path="/:sport" element={<SelectedSport />} />
      </Routes>
    </div>
  );
}

export default App;
