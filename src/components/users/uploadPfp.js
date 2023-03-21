import { useState } from "react";
import { storage, auth } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { editUserAsync, selectUser } from "../../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const UploadPfp = (props) => {
  const [uploadFile, setUploadFile] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    if (!uploadFile) return;

    const uid = user.uid;
    const imageRef = ref(storage, `image/${uploadFile.name + uid}`);
    await uploadBytes(imageRef, uploadFile);
    const imageUrl = await getDownloadURL(imageRef);
    console.log("IMAGE URL", imageUrl);
    console.log();
    dispatch(editUserAsync({ imageUrl, uid }));
  };

  return (
    <>
      <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload image</button>
    </>
  );
};
