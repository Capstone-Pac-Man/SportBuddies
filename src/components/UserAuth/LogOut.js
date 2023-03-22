import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("auth");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return <Button className="myBtn" onClick={logout}>Logout</Button>;
};
