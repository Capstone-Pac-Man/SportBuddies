// Api Route
const express = require("express");
const { request } = require("http");
const router = express.Router();
const Sequelize = require("sequelize");
const { User, UserSport, Sport } = require("../db/index");

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
    const { id, sportId, skillLevel, status, ...rest } = req.body;
    // Use authentication class Function
    const user = await User.findOne({
      where: {
        id: id,
      },
      include: {
        model: Sport,
      },
    });
    if (sportId) {
      if (skillLevel) {
        console.log("came here");
        await UserSport.update(
          { skillLevel: skillLevel },
          { where: { userId: id, sportId: sportId } }
        );
      }
      if (status) {
        console.log("came here");
        await UserSport.update(
          { status: status },
          { where: { userId: id, sportId: sportId } }
        );
      }
    }
    if (!user) {
      next();
    }
    await user.update(rest);
    const final = await User.findByPk(id, { include: { model: Sport } });
    res.json(final);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { filters } = req.query;
    let filter = [];
    if (filters) {
      filter = JSON.parse(filters);
      console.log(filter);
    }
    if (filter.length === 0) {
      const users = await User.findAll();
      res.json(users);
    } else {
      const userSports = await UserSport.findAll({
        where: {
          status: "active",
          [Sequelize.Op.or]: filter.map((val) => ({
            sportId: val.sportId,
            ...(val.skillLevel ? { skillLevel: val.skillLevel } : {}),
          })),
        },
      });
      const id = userSports.map((val) => {
        return val.userId;
      });
      const users = await User.findAll({
        where: {
          id,
        },
        include: {
          model: Sport,
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
  const { sportId, skillLevel, userId, status } = req.body;
  const user = await User.findByPk(userId);
  await UserSport.create({
    userId: userId,
    sportId: sportId,
    skillLevel: skillLevel,
    status: status,
  });
  const updatedUser = await User.findByPk(user.id, {
    include: {
      model: Sport,
    },
  });

  res.json(updatedUser);
});

router.delete("/me/sports", async (req, res, next) => {
  const { sportId, userId } = req.body;
  const userSport = await UserSport.findOne({
    where: {
      userId: userId,
      sportId: sportId,
    },
  });
  await userSport.destroy();
  const updatedUser = await User.findByPk(userId, {
    include: {
      model: Sport,
    },
  });

  res.json(updatedUser);
});

module.exports = router;
