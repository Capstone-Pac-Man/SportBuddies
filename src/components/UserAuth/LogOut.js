import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Button} from 'react-bootstrap'

export const Logout = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={logout}>Logout</Button>;
};