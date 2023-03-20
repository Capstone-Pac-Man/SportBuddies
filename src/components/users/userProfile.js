import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import { fetchOneUserAsync, selectUser } from "../../reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("UID!!!", uid);
        dispatch(fetchOneUserAsync(uid));
      }
    });
  }, []);

  return <h1> welcome {user.name}!</h1>;
};
