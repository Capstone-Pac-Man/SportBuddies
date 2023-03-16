const Sequelize = require("sequelize");
const db = require("../db");
const User = db.define(
  "user",
  {
    name: {
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
    },
    mobile: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
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
  },
  { timestamps: false }
);

module.exports = User;
