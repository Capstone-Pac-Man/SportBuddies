import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import {
  fetchOneUserAsync,
  selectUser,
  editUserAsync,
} from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { UploadPfp } from "./uploadPfp";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";


export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuth = localStorage.getItem("auth");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    dispatch(editUserAsync({ firstName, lastName, email, password, address }));
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  useEffect(() => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setEmail(user.email || "");
  }, [user]);

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     console.log("UID!!!", uid);
    //     dispatch(fetchOneUserAsync(uid));
    //   }
    // });
    if (isAuth) {
      dispatch(fetchOneUserAsync());
    } else {
      signOut(auth);
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (user.error === "error") {
      navigate("/login");
    }
  }, [user]);

  const handlePurge = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <>
      <div>
        <h1> Welcome, {user.name}!</h1>
        <img alt="" src={user.imageUrl} />
        <UploadPfp uid={user.uid} />
      </div>
      <ListGroup>
        <form id="edit-user-form">
          <ListGroup.Item>
            <button
              type="button"
              onClick={() => {
                handlePurge();
              }}
            >
              Wipe all fields.
            </button>
          </ListGroup.Item>
          <ListGroup.Item>
            <br></br>
            <label htmlFor="firstName">Update first name:</label>
            <input
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />{" "}
            <label htmlFor="lastName">Update last name:</label>
            <input
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br></br>
            <br></br>
            <label htmlFor="email">Update email address:</label>
            <input
              name="email"
              value={email}
              size="39"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br> <br></br>
            <p>
              <i>Note: this button will remain gray if any fields are empty.</i>
            </p>
            <button type="submit">Update my info.</button>
          </ListGroup.Item>
        </form>
      </ListGroup>
    </>
  );
};
