const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sport = require("./Sport");

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

Venue.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

Venue.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

Venue.authenticate = async function ({ email, password }) {
  const venue = await this.findOne({ where: { email } });
  if (!venue || !(await venue.correctPassword(password))) {
    const error = Error("Incorrect email/password");
    error.status = 401;
    throw error;
  }
  return venue.generateToken();
};

Venue.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const venue = Venue.findByPk(id, {
      include: {
        model: Sport,
      },
    });
    if (!venue) {
      throw new Error("Venue doesn't Exist");
    }
    return venue;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

const hashPassword = async (venue) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (venue.changed("password")) {
    venue.password = await bcrypt.hash(venue.password, SALT_ROUNDS);
  }
};

Venue.beforeCreate(hashPassword);
Venue.beforeUpdate(hashPassword);
Venue.beforeBulkCreate((venues) => Promise.all(venues.map(hashPassword)));

module.exports = Venue;
