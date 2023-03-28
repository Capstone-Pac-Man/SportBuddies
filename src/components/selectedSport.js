import React, { useEffect, useState } from "react";
import {
	Container,
	Row,
	Figure,
	Col,
	Card,
	Carousel,
	Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
	fetchAllRelatedToSportAsync,
	selectSport,
} from "../reducers/sportSlice";
import { SingleUserPage } from "./users/singleUserPage";
import Venue from "./venue";

export const SelectedSport = () => {
	const dispatch = useDispatch();
	const { sport } = useParams();
	const sportObj = useSelector(selectSport);

	useEffect(() => {
		dispatch(fetchAllRelatedToSportAsync(sport));
	}, [dispatch, sport]);

	if (!sportObj) return "Loading. Please wait";

	return (
		<Container fluid>
			<h1
				className="homeHeader"
				style={{ textAlign: "center" }}>
				{sport.toUpperCase()}
			</h1>
			<Row>
				<Col sm>
					<h1 className="homeHeader">Venues</h1>
					{sportObj.venues ? (
						sportObj.venues.map((venue) => (
							// <Row>
							// <Col> */}
							<Card
								key={venue.id}
								className="player-card">
								<Card.Img
									variant="top"
									className="homeCard"
									alt="Sport arena"
									src={venue.imageUrl}
									style={{ objectFit: "cover", aspectRatio: "2/3" }}
								/>
								<Card.Body style={{ minWidth: "100%", display: "flex" }}>
									<div
										style={{
											display: "flex",
											// flexDirection: "column",
											width: "80%",
										}}>
										<Card.Title>{venue.name}</Card.Title>
									</div>
									<Venue venueId={venue.id} />
								</Card.Body>
							</Card>
							// </Col>
							// </Row>
						))
					) : (
						<h1>No Venues nearby</h1>
					)}
				</Col>

				<Col
					sm
					xxl={8}>
					<Row>
						<h1 className="homeHeader">Players</h1>
						{sportObj.users ? (
							sportObj.users.map((user) => (
								<Card
									style={{ maxWidth: 350 }}
									key={user.id}
									className="player-card">
									{/* <Card className="homeCard"> */}
									<Card.Img
										src={user.imageUrl}
										alt="Image"
										className="homeCard"
									/>
									<Card.Body style={{ minWidth: "100%", display: "flex" }}>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												width: "80%",
											}}>
											<Card.Title>{user.fullName}</Card.Title>
										</div>
										<SingleUserPage playerId={user.id} />
									</Card.Body>
									{/* </Card> */}
								</Card>
							))
						) : (
							<h1>No Players nearby</h1>
						)}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};
