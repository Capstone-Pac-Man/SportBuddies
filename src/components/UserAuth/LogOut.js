import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchOneUserAsync, userLogout } from "../../reducers/userSlice";
import { useDispatch } from "react-redux";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("auth");
      await dispatch(userLogout());
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
