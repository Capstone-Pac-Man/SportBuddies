const { db, User, Sport, UserSport, Venue } = require("../server/db/index");

const users = [
  {
    name: "AlexVendor",
    email: "alex@gmail.com",
    imageUrl: "opentable.com/alex.gif",
    mobile: 6092439778,
    availableFrom: "10am",
    availableTo: "5pm",
    address: "230 5th Ave",
    city: "NY",
    country: "USA",
    userType: "vendor",
    uid: "brown@pig4",
  },
  {
    name: "Bianca",
    email: "bianca@gmail.com",
    imageUrl: "opentable.com/bianca.gif",
    mobile: 6097995847,
    availableFrom: "10am",
    availableTo: "5pm",
    address: "117 Park Ave",
    city: "NY",
    country: "USA",
    userType: "player",
    uid: "ravens@hop295tomato",
  },
  {
    name: "Ciara",
    email: "ciara@gmail.com",
    imageUrl: "opentable.com/ciara.gif",
    mobile: 6097165887,
    availableFrom: "6pm",
    availableTo: "8pm",
    address: "762 30th Street",
    city: "NY",
    country: "USA",
    userType: "player",
    uid: "maize&skew88fraud",
  },

  {
    name: "Diego",
    email: "diego@gmail.com",
    imageUrl: "opentable.com/diego.gif",
    mobile: 6462128888,
    availableFrom: "7am",
    availableTo: "12pm",
    address: "556 10th Ave",
    city: "NY",
    country: "USA",
    userType: "player",
    uid: "nikita$renault143",
  },
  {
    name: "Ernesto",
    email: "ernesto@gmail.com",
    imageUrl: "opentable.com/ernesto.gif",
    mobile: 9493420084,
    availableFrom: "5am",
    availableTo: "5pm",
    address: "180 Riverside Boulevard",
    city: "NY",
    country: "USA",
    userType: "player",
    uid: "carpe*mede184",
  },
  {
    name: "Fred",
    email: "freddy@gmail.com",
    imageUrl: "opentable.com/fred.gif",
    mobile: 2126469449,
    availableFrom: "noon",
    availableTo: "8pm",
    address: "415 e71st",
    city: "NY",
    country: "USA",
    userType: "player",
    uid: "shown7rid2938f@c3",
  },
];

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
