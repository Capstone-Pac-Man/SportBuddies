const Sequelize = require("sequelize");
const db = require("../db");

const Recipient = db.define(
  "recipient",
  {
    name: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);

module.exports = Recipient;
