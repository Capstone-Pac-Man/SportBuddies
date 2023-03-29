const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define(
  "message",
  {
    senderName: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.TEXT,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

module.exports = Message;
