const Sequelize = require("sequelize");
const db = require("../db");

const UserConversation = db.define(
  "userConversation",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = UserConversation;
