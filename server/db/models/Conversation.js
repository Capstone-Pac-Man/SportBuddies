const Sequelize = require("sequelize");
const db = require("../db");

const Conversation = db.define("conversation", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
module.exports = Conversation;
