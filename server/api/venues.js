// Api Route
const router = require("express").Router();
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");

//GET api/venues/
router.get("/", async (req, res, next) => {
  try {
    const venues = await Venue.findAll({
      include: Sport,
    });
    res.json(venues);
  } catch (err) {
    next(err);
  }
});

//GET api/venues/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const venue = await Venue.findByPk(id, {
      include: { model: Sport },
    });
    res.json(venue);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { sports, ...rest } = req.body;
    const venue = await Venue.create(rest);
    if (sports) {
      const sportObj = await Sport.findAll({ where: { name: sports } });
      await Promise.all(sportObj.map((s) => venue.addSport(s)));
    }
    const updated = await Venue.findByPk(venue.id, {
      include: { model: Sport },
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

//DELETE api/venues/:id
router.delete("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    const venue = await Venue.findByPk(id);
    if (!venue) {
      res.send("Venue does not exist");
    }
    await venue.destroy();
    res.json({ message: "deleted!" });
  } catch (err) {
    next(err);
  }
});

//PUT api/venues/:id
router.put("/", async (req, res, next) => {
  try {
    const { id, ...updated } = req.body;
    console.log(id);
    const venue = await Venue.findByPk(id);
    res.json(await venue.update(updated));
  } catch (err) {
    next(err);
  }
});

// CREATE A NEW VENUE via post route. /api/venues

module.exports = router;
