// Karsten routes
const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
const { User, UserSport } = require("../db");

router.put("/me", async (req, res, next) => {
  try {
    // Use authentication class Function
    const user = await User.findOne({
      where: {
        uid: req.body.uid,
      },
    });
    if (!user) {
      next();
    }
    const updated = await user.update(req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const params = req.params;
    if (req.params.length === 0) {
      const users = await User.findAll();
      res.json(users);
    } else {
      const userSports = await UserSport.findAll({
        where: {
          status: "active",
          [Sequelize.Op.or]: params.map((e) => ({
            sportId: e.sportId,
            skillLevel: e.skillLevel,
          })),
        },
      });
      const ids = userSports.map((val) => {
        return val.userId;
      });
      const users = await User.findAll({
        where: {
          ids,
        },
      });
      if (!users) {
        next();
      }
      res.json(users);
    }
  } catch (e) {
    next(e);
  }
});
