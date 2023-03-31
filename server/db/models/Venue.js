const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sport = require("./Sport");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const Venue = db.define(
  "venue",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: Sequelize.ENUM("Indoor", "Outdoor"),
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.TEXT,
    },

    hours: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/2463/2463422.png",
    },
    latitude: {
      type: Sequelize.FLOAT,
    },
    longitude: {
      type: Sequelize.FLOAT,
    },
  },
  { timestamps: false }
);

const SALT_ROUNDS = 5;

Venue.prototype.correctPassword = async function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return await bcrypt.compare(candidatePwd, this.password);
};

Venue.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

Venue.authenticate = async ({ email, password }) => {
  try {
    const venue = await Venue.findOne({ where: { email } });
    if (!venue || !(await venue.correctPassword(password))) {
      throw new Error("Invalid credentials");
    }
    return jwt.sign({ id: venue.id }, process.env.JWT);
  } catch (error) {
    console.log(error);
  }
};

Venue.findByToken = async function (token) {
  try {
    if (!token) {
      return;
    }
    const { id } = jwt.verify(token, process.env.JWT);
    const venue = Venue.findByPk(id, {
      include: {
        model: Sport,
      },
    });
    if (!venue) {
      throw new Error("Venue doesn't Exist");
    }
    return venue;
  } catch (e) {
    throw e;
  }
};

const hashPassword = async (venue) => {
  if (venue.changed("password")) {
    venue.password = await bcrypt.hash(venue.password, SALT_ROUNDS);
  }
};

const createCoordinates = async (venue) => {
  if (venue.address && venue.city) {
    const address = encodeURIComponent(`${venue.address},${venue.city}`);
    const url = `${process.env.REACT_APP_GEOCODING}/${address}.json?access_token=${process.env.REACT_APP_TOKEN}&limit=1`;
    try {
      const { data } = await axios.get(url);
      if (data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        venue.latitude = latitude;
        venue.longitude = longitude;
      }
    } catch (e) {
      console.log(e);
    }
  }
};

Venue.beforeCreate(createCoordinates);
Venue.beforeUpdate(createCoordinates);
Venue.beforeCreate(hashPassword);
Venue.beforeUpdate(hashPassword);
Venue.beforeBulkCreate((venues) => Promise.all(venues.map(hashPassword)));

module.exports = Venue;
