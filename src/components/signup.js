import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //**FOR NOW** console.log userCredential.user to see information offered
      console.log("SIGN UP SUCCESS");
      console.log(userCredential.user);
      console.log(userCredential);
    } catch (err) {
      console.error("ERROR!!", err);
    }
  };

  return (
    <div>
      <h1> SIGN UP FORM </h1>
      <form onSubmit={handleSignUp}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Email</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
