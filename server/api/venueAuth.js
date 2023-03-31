const router = require("express").Router();
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { token } = require("morgan");
const { wait } = require("@testing-library/user-event/dist/utils");

// POST api/auth
router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await Venue.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});
// POST api/auth
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, type, address, city, state, hours } =
      req.body;
    const venue = await Venue.create({
      name: name,
      email: email,
      password: password,
      type: type,
      address: address,
      city: city,
      state: state,
      hours: hours,
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

router.put("/me", async (req, res, next) => {
  try {
    const { venueId, ...rest } = req.body;
    const venue = await Venue.findByPk(venueId);
    await venue.update(rest);
    const updated = await Venue.findByPk(venueId, {
      include: { model: Sport },
    });
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.put("/me/password", async (req, res, next) => {
  try {
    const { email, password, newPassword, venueId } = req.body;
    const venue = await Venue.findByPk(venueId);
    if (await venue.correctPassword(password)) {
      await venue.update({ password: newPassword });
    }
    const updated = await Venue.findByPk(venueId, {
      include: { model: Sport },
    });
    res.send(updated);
  } catch (error) {
    next(error);
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
