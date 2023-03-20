const db = require("./db");
const User = require("../db/models/User");
const Venue = require("../db/models/Venue");
const Sport = require("../db/models/Sport");
const UserSport = require("../db/models/UserSport");

User.belongsToMany(Sport, { through: UserSport });
Sport.belongsToMany(User, { through: UserSport });

// because we created the UserSport model, we DON'T need quotes around name.

Venue.belongsToMany(Sport, { through: "venueSports" });
Sport.belongsToMany(Venue, { through: "venueSports" });
/* this requires quotes, as sequelize will CREATE the through-table for us.
(but we gotta name it) */

module.exports = {
  db,
  User,
  Venue,
  Sport,
  UserSport,
};
