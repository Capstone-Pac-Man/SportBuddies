import React, { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Container, Card, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editUserAsync } from "../../reducers/userSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [errorForm, setErrorForm] = useState("");

	const dispatch = useDispatch();

	const handleSignIn = async (e) => {
		try {
			e.preventDefault();
			await signInWithEmailAndPassword(auth, email, password);
			// After successful login, send sign in request to backend api.
			const { data } = await axios.post(
				"http://localhost:5000/api/users/login",
				{
					email: auth.currentUser.email,
					uid: auth.currentUser.uid,
				},
				{ withCredentials: true }
			);
			if (data.firstName) {
				localStorage.setItem("auth", true);

				const twelveHoursFromNow = new Date(Date.now() + 12 * 60 * 60 * 1000);
				const obj = { availableTo: twelveHoursFromNow.getTime() };
				dispatch(editUserAsync(obj));
			}
			navigate("/me");
			setEmail("");
			setPassword("");
		} catch (err) {
			console.log("ERROR!!", err);
			setErrorForm("Oops, your credentials are wrong. Try again");
			setEmail("");
			setPassword("");
		}
	};

	const signInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, googleProvider);

			//**FOR NOW** console.log userCredential.user to see information offered
			console.log("SIGN IN SUCCESS");

			const { data } = await axios.post(
				"http://localhost:5000/api/users/login",
				{
					providerId: userCredential.user.providerData[0].providerId,
					name: userCredential.user.displayName,
					email: userCredential.user.email,
					uid: userCredential.user.uid,
				},
				{ withCredentials: true }
			);
			if (data.firstName) {
				localStorage.setItem("auth", true);

				const twelveHoursFromNow = new Date(Date.now() + 12 * 60 * 60 * 1000);
				const obj = { availableTo: twelveHoursFromNow.getTime() };
				dispatch(editUserAsync(obj));
			}
			if (data.latitude && data.longitude) {
				const location = JSON.stringify({
					latitude: data.latitude,
					longitude: data.longitude,
				});
				sessionStorage.setItem("location", location);
			}
			navigate("/me");
		} catch (err) {
			console.error("Error!!", err);
			setErrorForm("Oops, your credentials are wrong. Try again");
			setEmail("");
			setPassword("");
		}
	};

	return (
		<Container className="d-flex align-items-center justify-content-center">
			<Card style={{ width: "50%", marginTop: "20%" }}>
				<Card.Body>
					<Card.Title>Log in</Card.Title>
					<Form
						onSubmit={handleSignIn}
						name="login"
						className="form">
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								className="formInput"
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								className="formInput"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<br></br>
						<Button
							type="submit"
							className="myBtn"
							disabled={email === "" || password.length === 0}>
							Log in
						</Button>
						<br></br>

						<Button
							variant="outline-dark"
							className="mt-4 pr-3"
							onClick={signInWithGoogle}>
							<img
								className="google"
								alt=""
								src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg "
							/>{" "}
							Sign in with Google{" "}
						</Button>
						<br></br>
						<br></br>
						<Form.Group className="d-flex justify-content-start align-items-center">
							<Row>
								<Form.Label>Don't have an account?</Form.Label>
								<Link
									to="/signup"
									style={{ color: "black" }}>
									Sign Up
								</Link>
							</Row>
						</Form.Group>
					</Form>
					{errorForm && <Alert variant="danger"> {errorForm} </Alert>}
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Login;
