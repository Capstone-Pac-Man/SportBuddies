// Api Route
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const User = require("../db/models/User");
const UserSport = require("../db/models/UserSport");

// POST api/users/
router.post("/", async (req, res, next) => {
  try {
    const { name, email, mobile, password, uid } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      uid: uid,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// api/users/me
router.get("/me", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        uid: req.params.uid,
      },
      include: [
        {
          model: UserSport,
        },
      ],
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

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
    if (Object.keys(req.params).length === 0) {
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

router.post("/me/sports", async (req, res, next) => {
  const { sportId, skillLevel, id } = req.body;
  const user = await User.findByPk(id);

  await UserSport.create({
    userId: id,
    sportId: sportId,
    skillLevel: skillLevel,
  });
  const updatedUser = User.findByPk(user.id, {
    include: {
      model: UserSport,
    },
  });

  res.json(updatedUser);
});

module.exports = router;
