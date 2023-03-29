const db = require("./db");
const User = require("../db/models/User");
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");
const UserSport = require("../db/models/UserSport");
const Message = require("../db/models/Message");
const UserConversation = require("../db/models/UserConversation");
const Conversation = require("../db/models/Conversation");
const Recipient = require("../db/models/Recipient");

User.belongsToMany(Sport, { through: UserSport });
Sport.belongsToMany(User, { through: UserSport });

// because we created the UserSport model, we DON'T need quotes around name.

Venue.belongsToMany(Sport, { through: "venueSports" });
Sport.belongsToMany(Venue, { through: "venueSports" });
/* this requires quotes, as sequelize will CREATE the through-table for us.
(but we gotta name it) */

//"Super" many-to-many associations for advanced eagerloading, check sequelize documentations for more details.

User.belongsToMany(Conversation, { through: UserConversation });
Conversation.belongsToMany(User, { through: UserConversation });
UserConversation.belongsTo(User);
UserConversation.belongsTo(Conversation);
User.hasMany(UserConversation);
Conversation.hasMany(UserConversation);

Recipient.belongsTo(UserConversation);
UserConversation.hasMany(Recipient);

UserConversation.hasMany(Message);
Message.belongsTo(UserConversation);

Recipient.belongsTo(User);
User.hasMany(Recipient, { foreignKey: "userId" });

User.hasMany(Message);
Message.belongsTo(User);

module.exports = {
  db,
  User,
  Venue,
  Sport,
  UserSport,
  Message,
  UserConversation,
  Conversation,
  Recipient,
};
