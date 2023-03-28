import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { authenticateRegister } from "../../reducers/venueAuthSlice";

const VenueSignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [hours, setHours] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		dispatch(
			authenticateRegister({
				name,
				type,
				address,
				city,
				state,
				hours,
				email,
				password,
			})
		);
		setName("");
		setType("");
		setAddress("");
		setCity("");
		setState("");
		setHours("");
		setEmail("");
		setPassword("");
		navigate("/venue/dashboard");
	};

	return (
		<Container className="d-flex align-items-center justify-content-center">
			<Card style={{ width: "50%", marginTop: "20%" }}>
				<Card.Body>
					<Card.Title className="title">Create a business account</Card.Title>
					<Form
						onSubmit={handleSignUp}
						name="signup"
						className="form">
						<Form.Group controlId="name">
							<Row>
								<Col>
									<Form.Label>Business Name</Form.Label>
									<Form.Control
										className="formInput"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col>
									<Form.Label>Street</Form.Label>
									<Form.Control
										className="formInput"
										type="text"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group controlId="state-zipcode">
							<Row>
								<Col>
									<Form.Label>City</Form.Label>
									<Form.Control
										className="formInput"
										type="text"
										value={city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</Col>
								<Col>
									<Form.Label>State</Form.Label>
									<Form.Select onChange={(e) => setState(e.target.value)}>
										<option>Choose your state</option>
										<option value="AL">Alabama</option>
										<option value="AK">Alaska</option>
										<option value="AZ">Arizona</option>
										<option value="AR">Arkansas</option>
										<option value="CA">California</option>
										<option value="CO">Colorado</option>
										<option value="CT">Connecticut</option>
										<option value="DE">Delaware</option>
										<option value="DC">District of Columbia</option>
										<option value="FL">Florida</option>
										<option value="GA">Georgia</option>
										<option value="HI">Hawaii</option>
										<option value="ID">Idaho</option>
										<option value="IL">Illinois</option>
										<option value="IN">Indiana</option>
										<option value="IA">Iowa</option>
										<option value="KS">Kansas</option>
										<option value="KY">Kentucky</option>
										<option value="LA">Louisiana</option>
										<option value="ME">Maine</option>
										<option value="MD">Maryland</option>
										<option value="MA">Massachusetts</option>
										<option value="MI">Michigan</option>
										<option value="MN">Minnesota</option>
										<option value="MS">Mississippi</option>
										<option value="MO">Missouri</option>
										<option value="MT">Montana</option>
										<option value="NE">Nebraska</option>
										<option value="NV">Nevada</option>
										<option value="NH">New Hampshire</option>
										<option value="NJ">New Jersey</option>
										<option value="NM">New Mexico</option>
										<option value="NY">New York</option>
										<option value="NC">North Carolina</option>
										<option value="ND">North Dakota</option>
										<option value="OH">Ohio</option>
										<option value="OK">Oklahoma</option>
										<option value="OR">Oregon</option>
										<option value="PA">Pennsylvania</option>
										<option value="RI">Rhode Island</option>
										<option value="SC">South Carolina</option>
										<option value="SD">South Dakota</option>
										<option value="TN">Tennessee</option>
										<option value="TX">Texas</option>
										<option value="UT">Utah</option>
										<option value="VT">Vermont</option>
										<option value="VA">Virginia</option>
										<option value="WA">Washington</option>
										<option value="WV">West Virginia</option>
										<option value="WI">Wisconsin</option>
										<option value="WY">Wyoming</option>
									</Form.Select>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Row>
								<Col>
									<Form.Label>Type</Form.Label>
									<Form.Select onChange={(e) => setType(e.target.value)}>
										<option>Choose type</option>
										<option value="Indoor">Indoor</option>
										<option value="Outdoor">Outdoor</option>
									</Form.Select>
								</Col>
								<Col>
									<Form.Label>Hours</Form.Label>
									<Form.Control
										className="formInput"
										type="text"
										value={hours}
										onChange={(e) => setHours(e.target.value)}
									/>
								</Col>
							</Row>
						</Form.Group>
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
								placeholder="Minimum: 8 characters"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<br></br>
						<Button
							disabled={
								name === "" ||
								email === "" ||
								state.length !== 2 ||
								email.includes("@") === false ||
								email.includes(".") === false ||
								password.length < 8 ||
								password.length > 88
							}
							variant="primary"
							type="submit"
							className="myBtn">
							Sign Up
						</Button>
						<br></br>
						<br></br>
						<Form.Group className="d-flex justify-content-start align-items-center">
							<Row>
								<Form.Label>Already have an account?</Form.Label>
								<Link
									to="/venue/login"
									style={{ color: "black" }}>
									Sign In
								</Link>
							</Row>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default VenueSignUp;
