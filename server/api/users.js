// Api Route
const Offset = require("./helpers/offset");
const distanceFilter = require("./helpers/distanceFilter");
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const { User, UserSport, Sport } = require("../db/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// POST api/users/
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, state, zipcode, uid } = req.body;
    const user = await User.create({
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
router.post("/logout", async (req, res, next) => {
  try {
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
      console.log(googleUser);
      console.log(name);
      const newName = name.split(" ");
      const lname = newName.pop();
      const fname = newName.join();
      console.log(lname);
      console.log(fname);
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
    console.log(token, user);
    res.cookie("token", token, { httpOnly: true });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// api/users/me
router.get("/me", async (req, res, next) => {
  try {
    console.log("REQ query", req.query);
    if (!req.cookies.token) {
      next();
    }
    const user = await User.findByToken(req.cookies.token);
    console.log(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/me", async (req, res, next) => {
  try {
    const { uid, sportId, skillLevel, status, imageUrl, ...rest } = req.body;
    console.log("IMAGE =>", imageUrl);
    console.log("UID", uid);
    console.log("REQ BODY ==>", req.body);
    // Use authentication class Function
    const user = await User.findByToken(req.cookies.token);

    console.log("USERS ID", user.id);
    if (sportId) {
      if (skillLevel) {
        console.log("came here");
        await UserSport.update(
          { skillLevel: skillLevel },
          { where: { userId: user.id, sportId: sportId } }
        );
      }
      if (status) {
        console.log("came here");
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
    const final = await User.findOne({
      where: {
        uid: uid,
      },
      include: {
        model: Sport,
      },
    });
    res.json(final);
  } catch (e) {
    next(e);
  }
});

//GET api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id, {
      include: {
        model: Sport,
      },
    });

    res.json(singleUser);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // Take in address and convert it to coordinates. Save address state.
    let users = [];
    // axios.get("/api/users", {params: {}})
    const { filters, longitude, latitude, distance } = req.query;
    // const dist = parseInt(distance);
    const dist = 5000;
    const lat = latitude ? parseFloat(latitude) : 40.77193565657;
    const long = longitude ? parseFloat(longitude) : -73.974863;
    let filter = [];
    const { longOffset, latOffset } = Offset(long, lat);
    // Check distance between user coords and all state users coordinates.
    // Return back all users within query distance
    console.log(filters);
    if (filters) {
      filter = JSON.parse(filters);
    }
    if (filter.length === 0) {
      users = await User.findAll({
        // where: {
        //   [Sequelize.Op.and]: {
        //     longitude: {
        //       [Sequelize.Op.between]: [long - longOffset, long + longOffset],
        //     },
        //     latitude: {
        //       [Sequelize.Op.between]: [lat - latOffset, lat + latOffset],
        //     },
        //   },
        // },
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
          // [Sequelize.Op.and]: {
          //   longitude: {
          //     [Sequelize.Op.between]: [long - longOffset, long + longOffset],
          //   },
          //   latitude: {
          //     [Sequelize.Op.between]: [lat - latOffset, lat + latOffset],
          //   },
          // },
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
