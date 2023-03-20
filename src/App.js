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
import { UserProfile } from "./components/users/userProfile";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<UserProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/venues" element={<Venues />} />
      </Routes>
    </div>
  );
}

export default App;
