// Api Route
const Offset = require("./helpers/offset");
const distanceFilter = require("./helpers/distanceFilter");
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { User, UserSport, Sport } = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

// POST api/users/
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, state, zipcode, uid } = req.body;
    await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      state: state,
      zipcode: zipcode,
      uid: uid,
    });
    const token = await User.authenticate({ email: email, uid: uid });
    const userNew = await User.findByToken(token);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json(userNew);
  } catch (error) {
    next(error);
  }
});
router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.send("logged out");
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let user;
    let token;
    if (req.body.providerId === "google.com") {
      const { name, email, uid, photoUrl } = req.body;
      const googleUser = await User.findOne({
        where: { email: email },
      });
      const newName = name.split(" ");
      const lname = newName.pop();
      const fname = newName.join();

      if (!googleUser) {
        user = await User.create({
          firstName: fname,
          lastName: lname,
          email: email,
          uid: uid,
          imageUrl: photoUrl,
        });
        token = await User.authenticate({ email: email, uid: uid });
      } else {
        token = await User.authenticate({ email: email, uid: uid });
      }
    } else {
      token = await User.authenticate({
        email: req.body.email,
        uid: req.body.uid,
      });
    }
    user = await User.findByToken(token);
    res.cookie("token", token, { httpOnly: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// api/users/me
router.get("/me", async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      next(new Error("Not logged in"));
      res.sendStatus(401);
    }
    const user = await User.findByToken(req.cookies.token);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
router.put("/me/location", async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const user = await User.findByToken(req.cookies.token);
    if (!user) {
      console.log("User not found");
    }
    await user.update({
      latitude: latitude,
      longitude: longitude,
    });
  } catch (e) {
    next(e);
  }
});

router.put("/me", async (req, res, next) => {
  try {
    const { sportId, skillLevel, status, imageUrl, ...rest } = req.body;
    // Use authentication class Function
    const user = await User.findByToken(req.cookies.token);

    if (sportId) {
      if (skillLevel) {
        await UserSport.update(
          { skillLevel: skillLevel },
          { where: { userId: user.id, sportId: sportId } }
        );
      }
      if (status) {
        await UserSport.update(
          { status: status },
          { where: { userId: user.id, sportId: sportId } }
        );
      }
    }

    if (imageUrl) {
      await user.update({
        imageUrl: imageUrl,
      });
    }

    if (!user) {
      next();
    }
    await user.update(rest);
    const updated = await User.findByToken(req.cookies.token);
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

//GET api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    if (req.params.id !== "me") {
      const singleUser = await User.findByPk(req.params.id, {
        include: {
          model: Sport,
        },
      });

      res.json(singleUser);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // Take in address and convert it to coordinates. Save address state.
    const now = Date.now();
    const reqUser = await User.findByToken(req.cookies.token);
    let users = [];
    const { filters, longitude, latitude } = req.query;
    const dist = 20;
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
            availableTo: {
              [Sequelize.Op.gt]: now,
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
            availableTo: {
              [Sequelize.Op.gt]: now,
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
    let newUsers = distanceFilter({ lat, long }, users, dist);
    if (reqUser) {
      newUsers = newUsers.filter((user) => user.id !== reqUser.id);
    }
    res.json(newUsers);
  } catch (e) {
    next(e);
  }
});

router.post("/me/sports", async (req, res, next) => {
  const { sportId, skillLevel, userId, status } = req.body;
  const user = await User.findByPk(userId);
  try {
    const [userSport, created] = await UserSport.findOrCreate({
      where: {
        userId: userId,
        sportId: sportId,
      },
      skillLevel: skillLevel,
      status: status,
    });
    if (!created) {
      res.status(409).json({ error: "User with this sport already exists" });
    } else {
      const updatedUser = await User.findByPk(user.id, {
        include: {
          model: Sport,
        },
      });

      res.json(updatedUser);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/me/sports/:sportId", async (req, res, next) => {
  const user = await User.findByToken(req.cookies.token);
  const userSport = await UserSport.findOne({
    where: {
      userId: user.id,
      sportId: req.params.sportId,
    },
  });
  await userSport.destroy();
  const updatedUser = await User.findByPk(user.id, {
    include: {
      model: Sport,
    },
  });

  res.json(updatedUser);
});

module.exports = router;
