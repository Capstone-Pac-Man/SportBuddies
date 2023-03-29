import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("auth");
      await axios.post("/api/users/logout");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className="pill-button" style={{ height: 25 }} onClick={logout}>
      Logout
    </button>
  );
};
