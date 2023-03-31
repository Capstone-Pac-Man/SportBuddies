const router = require("express").Router();
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");

// POST api/auth
router.post("/login", async (req, res, next) => {
  try {
    let token = await Venue.authenticate(req.body);
    if (!token) {
      next(new Error("Fail auth"));
    }
    res.json({ token: token });
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
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      next();
    }
    const venue = await Venue.findByToken(token);
    res.json(venue);
  } catch (e) {
    next(e);
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
    const { password, newPassword, venueId } = req.body;
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
