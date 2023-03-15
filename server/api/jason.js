// (jw) ADD NEW SPORT.       // REMOVE SPORT.        // CREATE VENUE
const router = require("express").Router();
const { Sport, Venue } = require("../db/index");

// ADD A NEW SPORT via post route. /api/sports
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Sport.create(req.body));
  } catch (error) {
    next(error);
  }
});

// REMOVE (i.e., DELETE) a sport: /api/sports/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const sportToDrop = await Sport.findByPk(req.params.id);
    await sportToDrop.destroy();
    res.send(sportToDrop);
  } catch (error) {
    next(error);
  }
});

// CREATE A NEW VENUE via post route. /api/venues
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Venue.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
