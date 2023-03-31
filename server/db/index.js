const db = require("./db");
const User = require("../db/models/User");
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");
const UserSport = require("../db/models/UserSport");
const Conversation = require("../db/models/Conversation");
const ConversationMessage = require("../db/models/ConversationMessage");

User.belongsToMany(Sport, { through: UserSport });
Sport.belongsToMany(User, { through: UserSport });

// because we created the UserSport model, we DON'T need quotes around name.

Venue.belongsToMany(Sport, { through: "venueSports" });
Sport.belongsToMany(Venue, { through: "venueSports" });
/* this requires quotes, as sequelize will CREATE the through-table for us.
(but we gotta name it) */

User.belongsToMany(Conversation, { through: "conversationUsers" });
Conversation.belongsToMany(User, { through: "conversationUsers" });

ConversationMessage.belongsTo(Conversation, { foreignKey: "conversationId" });
Conversation.hasMany(ConversationMessage, { foreignKey: "conversationId" });
ConversationMessage.belongsTo(User, { foreignKey: "senderId" });
User.hasMany(ConversationMessage, { foreignKey: "senderId" });

module.exports = {
  db,
  User,
  Venue,
  Sport,
  UserSport,
  Conversation,
  ConversationMessage,
};
