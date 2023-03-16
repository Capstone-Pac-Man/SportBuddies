const { db, User, Sport, UserSport, Venue } = require("../server/db/index");

const users = [
  {
    name: "AlexTrainer",
    email: "alex@gmail.com",
    imageUrl: "opentable.com/alex.gif",
    mobile: 6092439778,
    availableFrom: "10am",
    availableTo: "5pm",
    address: "230 5th Ave",
    city: "NY",
    country: "USA",
    userType: "trainer",
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

const venues = [
  {
    name: "Paul's Pitches",
    address: "2903 NJ-138",
    city: "Wall Township",
    state: "NJ",
    description: "Soccer pitches, baseball fields and climbing walls",
    hours: "7a to 7p",
  },
  {
    name: "Curt's Clubs",
    address: "1030 Fulton Street",
    city: "Brooklyn",
    state: "NY",
    description: "Driving range + mini golf. Great sandwiches, too.",
    hours: "6a to 8p",
  },
  {
    name: "Rhonda's Rings & Rinks",
    address: "11475 E Via Linda",
    city: "Scottsdale",
    state: "AZ",
    description: "Hockey rinks and boxing rings",
    hours: "9a to 11p",
  },
  {
    name: "Courtney Fields' Courts & Fields",
    address: "105 west 28",
    city: "NY",
    state: "NY",
    description: "football fields and basketball courts. Volleyball too!",
    hours: "11a to 11p",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      venues.map((product) => {
        return Venue.create(product);
      })
    );

    console.log("Seeding success, Pacman! ");
    db.close();
  } catch (err) {
    console.error("Oh noes! Something went wrong! catch block, seed.JS");
    console.error(err);
    db.close();
  }
};

seed();
