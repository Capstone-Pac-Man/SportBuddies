const Sequelize = require("sequelize");
const db = require("./db")

const UserSport = db.define("UserSport", {
    skillLevel : {
        type: Sequelize.ENUM("beginner", "intermediate", "advanced", "pro"),
		defaultValue: "beginner",
    },
    status : {
        type: Sequelize.ENUM("active", "inactive"),
		defaultValue: "inactive",
    }
})

module.exports = UserSport;