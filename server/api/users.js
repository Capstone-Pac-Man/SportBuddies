// Api Route
const Offset = require("./helpers/offset");
const distanceFilter = require("./helpers/distanceFilter");
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { User, UserSport, Sport } = require("../db/index");
const axios = require("axios");

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
    // Take in address and convert it to coordinates. Save address state.
    let users = [];
    const { filters, longitude, latitude, distance } = req.query;
    const dist = parseInt(distance);
    const lat = latitude ? parseFloat(latitude) : 40.77193565657;
    const long = longitude ? parseFloat(longitude) : -73.974863;
    let filter = [];
    const { longOffset, latOffset } = Offset(long, lat);
    // Check distance between user coords and all state users coordinates.
    // Return back all users within query distance
    if (filters) {
      filter = JSON.parse(filters);
    }
    if (filter.length === 0) {
      users = await User.findAll({
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
      users = await User.findAll({
        where: {
          id,
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
      if (!users) {
        next();
      }
    }
    const newUsers = distanceFilter({ lat, long }, users, dist);
    res.json(newUsers);
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
