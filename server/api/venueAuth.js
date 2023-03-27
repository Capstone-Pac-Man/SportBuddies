const router = require("express").Router();
const Venue = require("../db/models/Venue")
const Sport = require("../db/models/Sport")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { token } = require("morgan");

// POST api/auth
router.post("/login", async (req, res, next) => {
	try {
	  res.send({ token: await Venue.authenticate(req.body)} );
	} catch (err) {
	  next(err);
	}
  });
  // POST api/auth
router.post("/register", async (req, res, next) => {
	try {
	  const { name, email, password, type, address, city, state, hours } = req.body;
	  const venue = await Venue.create({
		name: name, 
        email: email, 
        password: password, 
        type: type, 
        address: address,
        city: city,
        state: state,
        hours: hours 
	});
	  res.send({ token: await venue.generateToken() });
	} catch (err) {
	  if (err.name === "SequelizeUniqueConstraintError") {
		res.status(401).send("Venue already exists");
	  } else {
		next(err);
	  }
	}
});
  // GET api/auth
router.get("/me", async (req, res, next) => {
	try {
	  res.send(await Venue.findByToken(req.headers.authorization));
	} catch (ex) {
	  next(ex);
	}
});

  // POST api/auth
router.post("/me/sports", async (req, res, next) => {
	try {
		const { venueId, sportId } = req.body;
		const venue = await Venue.findByPk(venueId);
		const sport = await Sport.findByPk(sportId);
		await venue.addSport(sport);
		const updated = await Venue.findByPk(venueId, {
		  include: { model: Sport },
		});
		res.json(updated);
	} catch (e) {
		next(e);
	}
});
  
  
  // DELETE api/auth
  router.put("/me/sports", async (req, res, next) => {
	try {
		const { venueId, sportId } = req.body; 
		const venue = await Venue.findByPk(venueId);
		const sport = await Sport.findByPk(sportId);
		console.log("SPORT", sport)
		console.log("VENUE", venue)
    	await venue.removeSport(sport);
    	const updated = await Venue.findByPk(venueId, {
      		include: { model: Sport },
    	});
    	res.json(updated);
	} catch (error) {
		next(error);
	}
  });


module.exports = router;