const router = require("express").Router();
const Sport = require("../db/models/Sport");
const User = require("../db/models/User");
const Venue = require("../db/models/Venue");
const { Op } = require("sequelize");

//GET api/sports/
router.get("/", async (req, res, next) => {
  try {
    const sports = await Sport.findAll();
    res.json(sports);
  } catch (err) {
    next(err);
  }
});

//GET api/sports/
router.get("/:sport", async (req, res, next) => {
  try {
    const sport = req.params.sport;
    const sportObj = await Sport.findOne({
      where: {
        name: {
          [Op.iLike]: `%${sport}%`,
        },
      },
    });

    res.json({
      sport: sportObj,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
