import { useState } from "react";
import { storage, auth } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { editUserAsync, selectUser } from "../../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { updateVenueAsync } from "../../reducers/venueAuthSlice";

export const UploadPfp = (props) => {
	const [uploadFile, setUploadFile] = useState(null);
	// const user = useSelector(selectUser);
	const dispatch = useDispatch();
	console.log(props);

	const handleUpload = async () => {
		if (!uploadFile) return;

		const imageRef = props.uid
			? ref(storage, `image/${uploadFile.name + props.uid}`)
			: ref(storage, `image/${uploadFile.name + props.venueId}`);

		await uploadBytes(imageRef, uploadFile);
		const imageUrl = await getDownloadURL(imageRef);
		props.uid
			? dispatch(editUserAsync({ imageUrl: imageUrl, uid: props.uid }))
			: dispatch(
					updateVenueAsync({ imageUrl: imageUrl, venueId: props.venueId })
			  );
		setUploadFile(null);
	};

	return (
		<Form.Group
			className="mb-3"
			controlId="image">
			<Form.Label>Image</Form.Label>
			<Form.Control
				type="file"
				onChange={(e) => setUploadFile(e.target.files[0])}
			/>
			<Button
				className="myBtn"
				onClick={handleUpload}>
				Upload image
			</Button>
		</Form.Group>
	);
};
