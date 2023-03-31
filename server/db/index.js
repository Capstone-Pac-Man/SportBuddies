const db = require("./db");
const User = require("../db/models/User");
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");
const UserSport = require("../db/models/UserSport");
const Conversation = require("../db/models/Conversation");
const ConversationMessage = require("../db/models/ConversationMessage");

User.belongsToMany(Sport, { through: UserSport });
Sport.belongsToMany(User, { through: UserSport });

Venue.belongsToMany(Sport, { through: "venueSports" });
Sport.belongsToMany(Venue, { through: "venueSports" });

User.belongsToMany(Conversation, { through: "conversationUsers" });
Conversation.belongsToMany(User, { through: "conversationUsers" });

ConversationMessage.belongsTo(Conversation, { foreignKey: "conversationId" });
Conversation.hasMany(ConversationMessage, { foreignKey: "conversationId" });

module.exports = {
  db,
  User,
  Venue,
  Sport,
  UserSport,
  Conversation,
  ConversationMessage,
};
