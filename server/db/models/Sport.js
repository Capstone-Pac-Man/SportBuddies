const Sequelize = require("sequelize");
const db = require("../db");

const Sport = db.define("sport", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	imageUrl: {
		type: Sequelize.STRING,
	},
});

module.exports = Sport;
