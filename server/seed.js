const { db, User, Sport, UserSport, Venue } = require("../server/db/index");

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log("Seeding success, Pacman! ");
    db.close();
  } catch (err) {
    console.error("Oh noes! Something went wrong! catch block, seed.JS");
    console.error(err);
    db.close();
  }
};

seed();
