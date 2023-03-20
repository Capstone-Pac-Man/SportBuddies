import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../config/firebase";
import { useEffect } from "react";
import { fetchOneUserAsync, selectUser } from "../../reducers/userSlice";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("user! -->", user);

  // console.log("auth.current ==>", auth.currentUser.uid);

  // const uid = auth.currentUser.uid;

  useEffect(() => {
    dispatch(fetchOneUserAsync("brown@pig4"));
  }, []);

  return <h1> welcome {user.name}!</h1>;
};
