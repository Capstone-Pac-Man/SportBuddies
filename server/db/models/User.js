const Sequelize = require("sequelize");
const db = require("../db");
const User = db.define(
  "user",
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue:
        "https://i.pinimg.com/474x/98/7a/df/987adf097a98ab1b32a953e2c33bba09.jpg",
    },
    mobile: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        is: /^\+?[0-9]{10,12}$/,
      },
    },
    availableFrom: {
      type: Sequelize.STRING,
    },
    availableTo: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zipcode: {
      type: Sequelize.INTEGER,
    },
    country: {
      type: Sequelize.STRING,
    },
    userType: {
      type: Sequelize.ENUM("player", "trainer"),
      defaultValue: "player",
    },

    uid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.FLOAT,
    },
    latitude: {
      type: Sequelize.FLOAT,
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  },
  { timestamps: false }
);

module.exports = User;
