const { findNonSerializableValue } = require("@reduxjs/toolkit");
const { db, User, Sport, UserSport, Venue } = require("../server/db/index");

const users = [
  {
    name: "AlexTrainer",
    email: "alex@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1349&q=80",
    mobile: 6092439778,
    availableFrom: "10am",
    availableTo: "5pm",
    address: "12020 E Shea Blvd",
    city: "Scottsdale",
    state: "AZ",
    userType: "trainer",
    uid: "brown@pig4",
    longitude: -111.8206921,
    latitude: 33.578713,
  },
  {
    name: "Bianca",
    email: "bianca@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1569241872171-7fbfc33b4b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    mobile: 6097995847,
    availableFrom: "10am",
    availableTo: "5pm",
    address: "12157 N 138th Way",
    city: "Scottsdale",
    state: "AZ",
    userType: "player",
    uid: "ravens@hop295tomato",
    longitude: -111.78147,
    latitude: 33.59631,
  },
  {
    name: "Ciara",
    email: "ciara@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1529271765130-29999f125749?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
    mobile: 6097165887,
    availableFrom: "6pm",
    availableTo: "8pm",
    address: "12121 N 124th St",
    city: "Scottsdale",
    state: "AZ",
    userType: "player",
    uid: "maize&skew88fraud",
    longitude: -111.81229,
    latitude: 33.59648,
  },

  {
    name: "Diego",
    email: "diego@gmail.com",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1676790135048-f74d2a55faab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    mobile: 6462128888,
    availableFrom: "7am",
    availableTo: "12pm",
    address: "9042 N 126th St",
    city: "Scottsdale",
    state: "AZ",
    userType: "player",
    uid: "nikita$renault143",
    longitude: -111.80864,
    latitude: 33.56941,
  },
  {
    name: "Ernesto",
    email: "ernesto@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1602339824201-171804fff052?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    mobile: 9493420084,
    availableFrom: "5am",
    availableTo: "5pm",
    address: "1013 E University Blvd",
    city: "Tuscon",
    state: "AZ",
    userType: "player",
    uid: "carpe*mede184",
    longitude: -110.955727,
    latitude: 32.232601,
  },
  {
    name: "Fred",
    email: "freddy@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1518614368389-5160c0b0de72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80",
    mobile: 2126469449,
    availableFrom: "noon",
    availableTo: "8pm",
    address: "415 e71st",
    city: "NY",
    state: "NY",
    userType: "player",
    uid: "shown7rid2938f@c3",
    longitude: -73.95549,
    latitude: 40.76697,
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
    imageUrl:
      "https://images.unsplash.com/photo-1566349872260-a1d88307b698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3802&q=80",
    latitude: 40.1699644,
    longitude: -74.0806924,
  },
  {
    name: "Curt's Clubs",
    address: "1030 Fulton Street",
    city: "Brooklyn",
    state: "NY",
    description: "Driving range + mini golf. Great sandwiches, too.",
    hours: "6a to 8p",
    imageUrl:
      "https://images.unsplash.com/photo-1633328514190-f69982416e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
    latitude: 40.68161,
    longitude: -73.9591971,
  },
  {
    name: "Rhonda's Rings & Rinks",
    address: "11475 E Via Linda",
    city: "Scottsdale",
    state: "AZ",
    description: "Hockey rinks and boxing rings",
    hours: "9a to 11p",
    imageUrl:
      "https://images.unsplash.com/photo-1607863400985-8d3bc50e3fd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2150&q=80",
    latitude: 33.5889916,
    longitude: -111.8339069,
  },
  {
    name: "Courtney Fields' Courts & Fields",
    address: "105 west 28",
    city: "NY",
    state: "NY",
    description: "football fields and basketball courts. Volleyball too!",
    hours: "11a to 11p",
    imageUrl:
      "https://images.unsplash.com/photo-1443029433954-f508cb9936b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    latitude: 40.746472,
    longitude: -73.990957,
  },
];

const userSport = [
  {
    skillLevel: "intermediate",
    status: "active",
    userId: 1,
    sportId: 1,
  },
  {
    status: "active",
    userId: 2,
    sportId: 1,
  },
  {
    status: "active",
    userId: 3,
    sportId: 4,
  },
  {
    status: "active",
    userId: 4,
    sportId: 1,
  },
  {
    status: "active",
    userId: 5,
    sportId: 2,
  },
  {
    status: "active",
    userId: 6,
    sportId: 3,
  },
];


const venueSport = [
  {
    venueId: 1,
    sportId: 1,
  },
  {
    venueId: 2,
    sportId: 1,
  },
  {
    venueId: 2,
    sportId: 2,
  },
  {
    venueId: 3,
    sportId: 4,
  },
  {
    venueId: 4,
    sportId: 1,
  },
  {
    venueId: 1,
    sportId: 3,
  },
  {
    venueId: 1,
    sportId: 4,
  },
];

const sports = ["Soccer", "Basketball", "Baseball", "Football"];




const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(async (user) => {
        await User.create(user);
      })
    );
    await Promise.all(
      sports.map(async (sport) => {
        await Sport.create({ name: sport });
      })
    );
    
    await Promise.all(
      userSport.map(async (val) => {
        let user = await User.findOne({
          where: {
            id: val.userId,
          },
        });

        await user.addSport(val.sportId, {
          through: { skillLevel: val.skillLevel },
        });
      })
    );

    

    await Promise.all(
      venues.map(async (venue) => {
        await Venue.create(venue);
      })
    );

    await Promise.all(
      venueSport.map(async (val) => {
        let venue = await Venue.findOne({
          where: {
            id: val.venueId,
          },
        });
        let sport = await Sport.findOne({
          where: {
            id: val.sportId,
          },
        });
        await venue.addSport(sport);
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
