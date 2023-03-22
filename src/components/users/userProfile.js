import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import {
  fetchOneUserAsync,
  selectUser,
  editUserAsync,
} from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { UploadPfp } from "./uploadPfp";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";

/* USER: name, email, imageUrl, mobile, availableFrom, 
availableTo, address, city, state, zipcode, country*/

export const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;

    const address = e.target.address.value;
    const state = e.target.state.value;
    const city = e.target.city.value;
    const country = e.target.country.value;
    const zipcode = e.target.zipcode.value;

    const availableFrom = e.target.availableFrom.value;
    const availableTo = e.target.availableTo.value;

    dispatch(
      editUserAsync({
        name,
        email,
        mobile,
        availableFrom,
        availableTo,
        city,
        state,
        zipcode,
        country,
        address,
      })
    );
    setName("");
    setEmail("");
    setMobile("");
    setAvailableFrom("");
    setAvailableTo("");
    setCity("");
    setState("");
    setZipcode("");
    setCountry("");
    setAddress("");
  };

  useEffect(() => {
    setName(user.name || "");
    setEmail(user.email || "");
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("in useEffect, UID========", uid);
        dispatch(fetchOneUserAsync(uid));
      }
    });
  }, []);

  const handlePurge = () => {
    setName("");
    setEmail("");
    setMobile("");
    setAvailableFrom("");
    setAvailableTo("");
    setCity("");
    setState("");
    setZipcode("");
    setCountry("");
    setAddress("");
  };
  console.log("user========", user);

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
            <label htmlFor="name" style={{ width: 130 }}>
              Update full name:
            </label>
            <input
              name="name"
              style={{ width: 400 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <br></br>
            <br></br>
            {/* /// */}
            <label htmlFor="email">Update email address:</label>
            <input
              style={{ width: 400 }}
              name="email"
              value={email}
              size="39"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* /// */}
            <label htmlFor="mobile">Update mobile:</label>
            <input
              name="mobile"
              value={mobile}
              style={{ width: 150 }}
              size="39"
              onChange={(e) => setMobile(e.target.value)}
            />
            {/* /// */}
            <br></br>
            <br></br>
            <label htmlFor="address">
              Update street address (e.g "19 Haversine Ave #3F"):
            </label>
            <input
              name="address"
              value={address}
              style={{ width: 340 }}
              size="39"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="city">Update city:</label>
            <input
              name="city"
              value={city}
              style={{ width: 200 }}
              size="39"
              onChange={(e) => setCity(e.target.value)}
            />
            <div>
              <br></br> (State dropdown will go here)
              <label htmlFor="zipcode" style={{ width: 90 }}>
                Update ZIP:
              </label>
              <input
                name="zipcode"
                value={zipcode}
                style={{ width: 130 }}
                size="39"
                onChange={(e) => setZipcode(e.target.value)}
              />
              <label htmlFor="country" style={{ width: 125 }}>
                Update country:
              </label>
              <input
                name="country"
                value={country}
                style={{ width: 200 }}
                size="39"
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
            <br></br>
            <label htmlFor="availableFrom">I am available from:</label>
            <input
              name="availableFrom"
              value={availableFrom}
              style={{ width: 60 }}
              size="39"
              onChange={(e) => setAvailableFrom(e.target.value)}
            />{" "}
            to <label htmlFor="availableTo"></label>
            <input
              name="availableTo"
              value={availableTo}
              style={{ width: 60 }}
              size="39"
              onChange={(e) => setAvailableTo(e.target.value)}
            />{" "}
            .<br></br>
            <p>
              <i>This button will remain frozen if any fields are empty.</i>
            </p>
            <button type="submit">Update my info.</button>
          </ListGroup.Item>
        </form>
      </ListGroup>
    </>
  );
};

export default UserProfile;
