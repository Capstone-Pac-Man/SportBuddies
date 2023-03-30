const Sequelize = require("sequelize");
const db = require("../db");

const ConversationMessage = db.define("conversationMessage", {
  senderId: {
    type: Sequelize.INTEGER,
  },
  content: {
    type: Sequelize.TEXT,
  },
});
module.exports = ConversationMessage;
