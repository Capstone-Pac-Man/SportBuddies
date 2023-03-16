import "./index.css";
import React, {useState, useEffect }  from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import SignUp from "./components/UserAuth/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase"
import AlexHome from "./components/AlexHome";
import NavBar from "./components/Navbar";




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);
  

  return (
    <div className="App">
      <NavBar/>
      {isLoggedIn ? (
        <Routes>
          {/* needs to be deleted after we have home page */}
          <Route path="/" element={<AlexHome />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AlexHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
