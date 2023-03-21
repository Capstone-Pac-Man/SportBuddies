// Api Route
const Offset = require("./helpers/offset");
const distanceFilter = require("./helpers/distanceFilter");
const Sequelize = require("sequelize");
const router = require("express").Router();
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");

//GET api/venues/
router.get("/", async (req, res, next) => {
  try {
    const { filters, latitude, longitude, distance } = req.query;
    const dist = parseInt(distance);
    const lat = latitude ? parseFloat(latitude) : 40.77193565657;
    const long = longitude ? parseFloat(longitude) : -73.974863;
    let filter = [];
    let venues = [];
    const { longOffset, latOffset } = Offset(long, lat);
    // Check distance between user coords and all state users coordinates.
    // Return back all users within query distance
    if (filters) {
      const temp = JSON.parse(filters);
      const sports = await Sport.findAll({
        where: {
          name: {
            [Sequelize.Op.in]: temp,
          },
        },
      });
      filter = sports.map((e) => e.id);
    }
    if (filter.length > 0) {
      venues = await Venue.findAll({
        where: {
          [Sequelize.Op.and]: {
            longitude: {
              [Sequelize.Op.between]: [long - longOffset, long + longOffset],
            },
            latitude: {
              [Sequelize.Op.between]: [lat - latOffset, lat + latOffset],
            },
          },
        },
        include: {
          model: Sport,
          where: {
            id: {
              [Sequelize.Op.in]: filter,
            },
          },
        },
      });
    } else {
      venues = await Venue.findAll({
        where: {
          [Sequelize.Op.and]: {
            longitude: {
              [Sequelize.Op.between]: [long - longOffset, long + longOffset],
            },
            latitude: {
              [Sequelize.Op.between]: [lat - latOffset, lat + latOffset],
            },
          },
        },
        include: {
          model: Sport,
        },
      });
    }
    const newVenues = distanceFilter({ lat, long }, venues, dist);
    res.json(newVenues);
  } catch (err) {
    next(err);
  }
});

//POST api/venues/sports - add sport to venue
router.post("/sports", async (req, res, next) => {
  try {
    const { id, sportId } = req.body;
    const venue = await Venue.findByPk(id);
    const sport = await Sport.findByPk(sportId);
    await venue.addSport(sport);
    const updated = await Venue.findByPk(id, {
      include: { model: Sport },
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});
router.delete("/sports", async (req, res, next) => {
  try {
    const { id, sportId } = req.body;
    const venue = await Venue.findByPk(id);
    const sport = await Sport.findByPk(sportId);
    await venue.removeSport(sport);
    const updated = await Venue.findByPk(id, {
      include: { model: Sport },
    });
    res.json(updated);
  } catch (e) {
    next(e);
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

// POST api/venues/
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

module.exports = router;
