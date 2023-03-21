import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import { fetchOneUserAsync, selectUser } from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuth = localStorage.getItem("auth");

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

  return <h1> welcome {user.name}!</h1>;
};
