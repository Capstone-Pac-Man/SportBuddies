const Sequelize = require("sequelize");
const db = require("../db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Sport = require("./Sport");
dotenv.config();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 7;

const User = db.define(
  "user",
  {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/1193/1193243.png",
    },
    mobile: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        is: /^\+?[0-9]{10,12}$/,
      },
    },
    availableTo: {
      type: Sequelize.BIGINT,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    zipcode: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    userType: {
      type: Sequelize.ENUM("player", "trainer"),
      defaultValue: "player",
    },

    uid: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.FLOAT,
    },
    latitude: {
      type: Sequelize.FLOAT,
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
  },
  { timestamps: false }
);
User.beforeCreate(async (user) => {
  const hashed = await bcrypt.hash(user.uid, SALT_ROUNDS);
  user.uid = hashed;
});

User.findByToken = async (token) => {
  try {
    if (!token) {
      return;
    }
    const { id } = jwt.verify(token, process.env.JWT);

    const user = await User.findByPk(id, {
      include: {
        model: Sport,
      },
    });
    if (!user) {
      console.log("User not found");
    }
    return user;
  } catch (e) {
    throw e;
  }
};
User.authenticate = async ({ email, uid }) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user || !(await bcrypt.compare(uid, user.uid))) {
      throw new Error("Invalid credentials");
    }
    return jwt.sign({ id: user.id }, process.env.JWT);
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;
