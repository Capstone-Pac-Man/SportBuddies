import { useState } from "react";
import { storage, auth } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { editUserAsync, selectUser } from "../../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

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
    dispatch(editUserAsync({ imageUrl, uid }));
    setUploadFile(null);
  };

  return (
    <Form.Group className="mb-3" controlId="image">
      <Form.Label>Image</Form.Label>
      <Form.Control type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
      <Button className='myBtn' onClick={handleUpload}>Upload image</Button>
    </Form.Group>
  );
};
