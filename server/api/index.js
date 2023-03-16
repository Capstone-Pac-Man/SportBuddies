const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Sport, User, Venue } = require("../db/index");

router.use("/users", require("./users"));
router.use("/venues", require("./venues"));

router.get("/search", async (req, res, next) => {
  try {
    const { search } = req.query;
    const users = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      include: {
        model: Sport,
      },
    });
    const venues = await Venue.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      include: {
        model: Sport,
      },
    });
    res.json({ users: users, venues: venues });
  } catch (e) {
    next(e);
  }
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
