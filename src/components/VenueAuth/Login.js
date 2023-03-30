import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticateLogin } from "../../reducers/venueAuthSlice";
import { Form, Button, Container, Card, Row, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchOneVenueAsync } from "../../reducers/venueAuthSlice";
import { editUserAsync } from "../../reducers/userSlice";
import axios from "axios";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState("");
	const auth = useSelector((state) => state.auth);
	const { error } = auth;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			dispatch(fetchOneVenueAsync());
		}
	}, []);
	useEffect(() => {
		if (auth.email) {
			navigate("/venue/dashboard");
		}
	}, [auth]);

	const handleSubmit = async (evt) => {
		try {
			evt.preventDefault();
			// const { data } = await axios.post(
			// 	"http://localhost:5000/api/auth/login",
			// 	{ email: email, password: password },
			// 	{
			// 		withCredentials: true,
			// 	}
			// );
			// console.log("DATA", data);
			// if (data) {
			// 	window.localStorage.setItem("token", data);
			// } else if (data === null) {
			// 	setFormError("Oops, your credentials are wrong. Try again");
			// }
			await dispatch(authenticateLogin({ email, password }));

			navigate("/venue/dashboard");
			setEmail("");
			setPassword("");
		} catch (err) {
			console.log(err);

			setEmail("");
			setPassword("");
		}
	};

	return (
		<Container>
			<div className="d-flex align-items-center justify-content-center">
				<Card
					style={{ width: "50%", marginTop: "20%" }}
					id="loginRegister">
					<Card.Body>
						<Card.Title className="title">Business Login</Card.Title>
						<Form
							onSubmit={handleSubmit}
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
								Login
							</Button>
							<br></br>
							<br></br>
							<Form.Group className="d-flex justify-content-start align-items-center">
								<Row>
									<Form.Label>Don't have an account?</Form.Label>
									<Link
										to="/venue/signup"
										style={{ color: "black" }}>
										Sign Up
									</Link>
								</Row>
							</Form.Group>
						</Form>
						{error ? (
							<Alert variant="danger">
								"Oops, your credentials are wrong. Try again"
							</Alert>
						) : null}
					</Card.Body>
				</Card>
			</div>
		</Container>
	);
}

export default Login;
