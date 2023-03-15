const router = require("express").Router();
const { Venue } = require("../db");

//GET api/venues/
router.get("/", async (req, res, next) => {
  try {
    const venues = await Venue.findAll({
      include: "venueSports",
    });
    res.json(venues);
  } catch (err) {
    next(err);
  }
});

//GET api/venues/:id
router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    const venue = await Venue.findByPk({
      id,
      include: "venueSports",
    });
    res.json(venue);
  } catch (err) {
    next(err);
  }
});

//DELETE api/venues/:id
router.delete("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    const venue = await Venue.findByPk({ id });
    await venue.destroy();
    res.json(venue);
  } catch (err) {
    next(err);
  }
});

//PUT api/venues/:id
router.put("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    const venue = await Venue.findByPk({ id, include: "venueSports" });

    res.json(await venue.update(req.body));
  } catch (err) {
    next(err);
  }
});
