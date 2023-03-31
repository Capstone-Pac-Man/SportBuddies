import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Col, Row } from "react-bootstrap";

const Four = () => {
	const names = [
		"Jason Wang",
		"Brian Wong",
		"Karsten Fisk",
		"Aliaksei Kalupaila",
	];
	const jason =
		"Jason, you are an awesome guy. I admire your energy. Keep suprising people with your sence of humor and sharp mind!";
	const brian =
		"Yoyoyo Brian, you are a super hardworking person. I am sure that you will reach your goal. Don't stop, keep pushing!";
	const karsten =
		"Karsten, you are a super talented and smart person. It feels like your have an answer to every question, like chatGPT;). Good Luck with everything";
	const aliaksei = "Just for myself";
	const words = [jason, brian, karsten, aliaksei];

	const [show, setShow] = useState(false);
	const [text, setText] = useState("");
	const [name, setName] = useState("");

	const handleClose = () => {
		setName("");
		setShow(false);
	};
	const handleShow = (num) => {
		setShow(true);
		setName(names[num]);
		setText(words[num]);
	};
	const thankYou = "Thank you man! It was a pleasure waorking with you!";
	return (
		<div style={{ marginTop: "30vh" }}>
			<Container>
				<Row>
					<Col>
						<Button
							className="myBtn"
							onClick={() => handleShow(0)}>
							{names[0]}
						</Button>
					</Col>
					<Col>
						<Button
							className="myBtn"
							onClick={() => handleShow(1)}>
							{names[1]}
						</Button>
					</Col>
					<Col>
						<Button
							className="myBtn"
							onClick={() => handleShow(2)}>
							{names[2]}
						</Button>
					</Col>
					<Col>
						<Button
							className="myBtn"
							onClick={() => handleShow(3)}>
							{names[3]}
						</Button>
					</Col>

					<Modal
						show={show}
						onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>{name}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h6>{text}</h6>
							<p>{thankYou}</p>
						</Modal.Body>
						<Modal.Footer>
							<Button
								className="btn-sm btn-dark"
								onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</Row>
			</Container>
		</div>
	);
};

export default Four;
