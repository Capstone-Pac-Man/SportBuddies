const Sequelize = require("sequelize");
const db = require("../db");

const Conversation = db.define(
  "conversation",
  {
    selected: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = Conversation;
