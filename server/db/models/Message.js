const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define(
  "message",
  {
    senderName: {
      type: Sequelize.INTEGER,
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
