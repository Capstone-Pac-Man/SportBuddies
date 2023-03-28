import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneUserAsync } from "../reducers/userSlice";
import { fetchAllUsersAsync } from "../reducers/usersSlice";
import { fetchAllVenuesAsync } from "../reducers/venuesSlice";

const ZipInput = ({ location, setLocation }) => {
  const [editing, setEditing] = useState(false);
  const [zip, setZip] = useState();
  const [val, setVal] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchOneUserAsync());
  }, [dispatch]);
  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isNaN(parseInt(val)) && val.length === 5) {
        const base = `${process.env.REACT_APP_GEOCODING}/${val}.json`;
        const params = {
          access_token: process.env.REACT_APP_TOKEN,
          types: "postcode",
          limit: 1,
        };
        const { data } = await axios.get(base, { params });
        const zipLocation = {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
        };
        console.log(data);
        if (user.fullName && data.features[0]) {
          axios
            .put(
              "http://localhost:5000/api/users/me",
              {
                latitude: zipLocation.latitude,
                longitude: zipLocation.longitude,
              },
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res.data);
              console.log(
                `Set location of ${user.fullName} based on provided zip code`
              );
            });
        }
        sessionStorage.setItem("location", JSON.stringify(zipLocation));
        if (zipLocation.latitude) {
          dispatch(fetchAllUsersAsync());
          dispatch(fetchAllVenuesAsync());
        }
        setVal("");
        setLocation(true);
        setEditing(false);
      }
    }
  };
  return (
    <div
      style={{
        color: "white",
        opacity: "0.6",
        display: "flex",
        cursor: "pointer",
        padding: 7,
        borderRadius: 12,
      }}
      onClick={(e) => {
        // e.preventDefault();
        // onClick(e);
        if (!editing) {
          setEditing(true);
        }
      }}
    >
      <div
        style={{
          height: 18,
          width: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: 5,
        }}
        onClick={(e) => setEditing(!editing)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            fill="white"
          />
        </svg>
      </div>
      <div>
        {!editing ? (
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: -1,
              whiteSpace: "nowrap",
            }}
          >
            Change Location
          </div>
        ) : (
          <Form.Control
            placeholder="Enter Zip"
            // size="sm"
            style={{ maxHeight: 25, maxWidth: 130 }}
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => handleSubmit(e)}
          />
        )}
      </div>
    </div>
  );
};

export default function LocationChange({ location, setLocation }) {
  // const [zip, setZip] = useState();
  // const [val, setVal] = useState("");
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  // useEffect(() => {
  //   dispatch(fetchOneUserAsync());
  // }, [dispatch]);
  // const handleSubmit = async (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (!isNaN(parseInt(val)) && val.length === 5) {
  //       const base = `${process.env.REACT_APP_GEOCODING}/${val}.json`;
  //       const params = {
  //         access_token: process.env.REACT_APP_TOKEN,
  //         types: "postcode",
  //         limit: 1,
  //       };
  //       const { data } = await axios.get(base, { params });
  //       const zipLocation = {
  //         latitude: data.features[0].center[1],
  //         longitude: data.features[0].center[0],
  //       };
  //       console.log(data);
  //       if (user.fullName && data.features[0]) {
  //         axios
  //           .put(
  //             "http://localhost:5000/api/users/me",
  //             {
  //               latitude: zipLocation.latitude,
  //               longitude: zipLocation.longitude,
  //             },
  //             { withCredentials: true }
  //           )
  //           .then((res) => {
  //             console.log(res.data);
  //             console.log(
  //               `Set location of ${user.fullName} based on provided zip code`
  //             );
  //           });
  //       }
  //       sessionStorage.setItem("location", JSON.stringify(zipLocation));
  //       if (zipLocation.latitude) {
  //         dispatch(fetchAllUsersAsync());
  //         dispatch(fetchAllVenuesAsync());
  //       }
  //       setVal("");
  //       setLocation(true);
  //     }
  //   }
  // };
  return (
    <div style={{ paddingLeft: 4, fontWeight: 800 }}>
      {/* <Dropdown style={{ display: "flex" }}>
        <Dropdown.Toggle as={ZipInput}></Dropdown.Toggle>
        <Dropdown.Menu style={{ width: 200, padding: 10, display: "flex" }}>
          <Form.Control
            placeholder="Enter Zip Code here"
            size="sm"
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => handleSubmit(e)}
          />
        </Dropdown.Menu>
      </Dropdown> */}
      <ZipInput location={location} setLocation={setLocation} />
    </div>
  );
}
