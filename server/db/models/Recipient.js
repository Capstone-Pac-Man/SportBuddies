const Sequelize = require("sequelize");
const db = require("../db");

const Recipient = db.define(
  "recipient",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Recipient;
