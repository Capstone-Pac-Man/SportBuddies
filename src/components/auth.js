import { auth, googleProvider } from "../config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //**FOR NOW** console.log userCredential.user to see information offered
      console.log("SIGN IN SUCCESS");
      console.log(userCredential.user);
    } catch (err) {
      console.error("ERROR!!", err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      //**FOR NOW** console.log userCredential.user to see information offered
      console.log("SIGN IN SUCCESS");
      console.log(userCredential.user);
    } catch (err) {
      console.error("Error!!", err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign out successful");
    } catch (err) {
      console.error("Error!!", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Email</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};
