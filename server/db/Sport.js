const Sequelize = require("sequelize");
const db = require("./db")

const Sport = db.define("Sport", {
    name : {
        type: Sequelize.STRING,
		allowNull: false,
        unique: true,
    }
})

module.exports = Sport;