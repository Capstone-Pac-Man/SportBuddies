const { findNonSerializableValue } = require("@reduxjs/toolkit");
const {
	db,
	User,
	Sport,
	UserSport,
	Venue,
	Conversation,
	ConversationMessage,
} = require("../server/db/index");
const now = new Date();
const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
const futureUTC = futureDate.getTime();

const users = [
	{
		firstName: "Alex",
		lastName: "Trainer",
		email: "alex@gmail.com",
		imageUrl:
			"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1349&q=80",
		mobile: 6092439778,
		availableTo: futureUTC,
		address: "12020 E Shea Blvd",
		city: "Scottsdale",
		state: "AZ",
		userType: "trainer",
		uid: "brown@pig4",
		longitude: -111.8206921,
		latitude: 33.578713,
	},
	{
		firstName: "Bianca",
		lastName: "Miles",
		email: "bianca@gmail.com",
		imageUrl:
			"https://images.unsplash.com/photo-1569241872171-7fbfc33b4b21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		mobile: 6097995847,
		availableTo: futureUTC,
		address: "12157 N 138th Way",
		city: "Scottsdale",
		state: "AZ",
		userType: "player",
		uid: "ravens@hop295tomato",
		longitude: -111.78147,
		latitude: 33.59631,
	},
	{
		firstName: "Ciara",
		lastName: "Jones",
		email: "ciara@gmail.com",
		imageUrl:
			"https://images.unsplash.com/photo-1529271765130-29999f125749?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		mobile: 6097165887,
		availableTo: futureUTC,
		address: "12121 N 124th St",
		city: "Scottsdale",
		state: "AZ",
		userType: "player",
		uid: "maize&skew88fraud",
		longitude: -111.81229,
		latitude: 33.59648,
	},

	{
		firstName: "Diego",
		lastName: "Maradona",
		email: "diego@gmail.com",
		imageUrl:
			"https://plus.unsplash.com/premium_photo-1676790135048-f74d2a55faab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 6462128888,
		availableFrom: "7am",
		availableTo: futureUTC,
		address: "9042 N 126th St",
		city: "Scottsdale",
		state: "AZ",
		userType: "player",
		uid: "nikita$renault143",
		longitude: -111.80864,
		latitude: 33.56941,
	},
	{
		firstName: "Ernesto",
		lastName: "De La Cruz",
		email: "ernesto@gmail.com",
		imageUrl:
			"https://images.unsplash.com/photo-1602339824201-171804fff052?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 9493420084,
		availableTo: futureUTC,
		address: "1013 E University Blvd",
		city: "Tuscon",
		state: "AZ",
		userType: "player",
		uid: "carpe*mede184",
		longitude: -110.955727,
		latitude: 32.232601,
	},
	{
		firstName: "Fred",
		lastName: "Smith",
		email: "freddy@gmail.com",
		imageUrl:
			"https://images.unsplash.com/photo-1518614368389-5160c0b0de72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2200&q=80",
		mobile: 2126469449,
		availableTo: futureUTC,
		address: "415 e71st",
		city: "NY",
		state: "NY",
		userType: "player",
		uid: "shown7rid2938f@c3",
		longitude: -73.95549,
		latitude: 40.76697,
	},
	{
		//08724 BRICK, NJ BRICK, NJ BRICK, NJ BRICK, NJ BRICK, NJ BRICK, NJ
		firstName: "Guinevere",
		lastName: "Beck",
		email: "g@beck.com",
		imageUrl:
			"https://www.gannett-cdn.com/-mm-/8a6e606e8bf30067c6052e97f5b6b39c6d055570/c=0-0-3497-1976/local/-/media/2016/10/12/USATODAY/USATODAY/636118830553229435-2SLINE-RONDA-ROUSEY-74885118.JPG",
		mobile: 9485068392,
		availableTo: futureUTC,
		address: "191 Van Zile Road",
		city: "Brick",
		state: "NJ",
		userType: "trainer",
		uid: "037d8aa57d67",
		longitude: -74.11697782807603,
		latitude: 40.077055904050646,
	},
	{
		//08724 ,
		firstName: "Hillary",
		lastName: "Banks",
		email: "h@banks.com",
		imageUrl:
			"https://imgix.bustle.com/rehost/2016/9/13/9e2a4982-bb3a-4d1a-abce-7729bd0349bd.jpg",
		mobile: 2124494838,
		availableTo: futureUTC,
		address: "23 Ocean Avenue North",
		city: "Brick",
		state: "NJ",
		userType: "player",
		uid: "594b2883f247k",
		longitude: -73.9783579045623,
		latitude: 40.30120169813845,
	},
	{
		//08724 ,
		firstName: "Inigo",
		lastName: "Montoya",
		email: "i@montoya.com",
		imageUrl:
			"https://www.rethinkcare.com/wp-content/uploads/2022/04/Be-Like-Inigo-Montoya.jpg",
		mobile: 6097995873,
		availableTo: futureUTC,
		address: "55 Melrose Terrace",
		city: "Long Branch",
		state: "NJ",
		userType: "trainer",
		uid: "f90e4jgkj23j99##7",
		longitude: -73.98045358326493,
		latitude: 40.3018578829103,
	},
	{
		//08724 ,
		firstName: "Jason",
		lastName: "Bourne",
		email: "j@bourne.com",
		imageUrl:
			"https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/16/1461218409-matt-damon-jason-bourne-5-trailer.JPG",
		mobile: 6097995273,
		availableTo: futureUTC,
		address: "77 Melrose Terrace",
		city: "Long Branch",
		state: "NJ",
		userType: "trainer",
		uid: "f90e4jgkj23j99##7",
		longitude: -73.98045358326493,
		latitude: 40.3018578829103,
	},

	// 19149 19149 19149 19149 19149 19149 PHILLY
	{
		//19149
		firstName: "Kim",
		lastName: "Possible",
		email: "k@possible.com",
		imageUrl:
			"https://www.stewarthaasracing.com/wp-content/uploads/SHR-Danica-Code-3-1200x1208.jpg",
		mobile: 2156468294,
		availableTo: futureUTC,
		address: "6501 Castor Avenue",
		city: "Philaldephia",
		state: "PA",
		userType: "trainer",
		uid: "b5@080b9!#cc30",
		longitude: -75.0758079665264,
		latitude: 40.04068385875287,
	},

	{
		//19149
		firstName: "Lance",
		lastName: "Armstrong",
		email: "l@armstrong.com",
		imageUrl:
			"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-03/230317-Lance-Reddick-mjf-1517-55423b.jpg",
		mobile: 2158084030,
		availableTo: futureUTC,
		address: "1300 Hellerman Street",
		city: "Philaldephia",
		state: "PA",
		userType: "player",
		uid: "b5@080098j349gIOUSJDFAIOqcpmJfiojb9!#cc30",
		longitude: -75.0776360806086,
		latitude: 40.0388498032552,
	},

	{
		//19149
		firstName: "Michael",
		lastName: "Sorrentino",
		email: "m@sorrentino.com",
		imageUrl:
			"https://s.abcnews.com/images/Entertainment/SPL_mike_black_eye_mar_140618_16x9_992.jpg",
		mobile: 2156464101,
		availableTo: futureUTC,
		address: "924 Levick Street",
		city: "Philaldephia",
		state: "PA",
		userType: "player",
		uid: "b5@0foimsc4voiae65fiojweOIAJFoijaZPL#Sc30",
		longitude: -75.0857357170117,
		latitude: 40.04394463276886,
	},

	//85259 SCOTTSDALE 85259 SCOTTSDALE 85259 SCOTTSDALE 85259 SCOTTSDALE 85259 SCOTTSDALE
	//85259 SCOTTSDALE 85259 SCOTTSDALE 85259 SCOTTSDALE 85259 SCOTTSDALE 85259 SCOTTSDALE

	{
		firstName: "Novak",
		lastName: "Djokovic",
		email: "n@djokovic.com",
		imageUrl:
			"https://media.npr.org/assets/img/2021/09/21/gettyimages-927254864_wide-a978ec346ea3add6c594f1d554b516ad55c59cce.jpg",
		mobile: 4806142747,
		availableTo: futureUTC,
		address: "10767 North 116th Street",
		city: "Scottsdale",
		state: "AZ",
		userType: "trainer",
		uid: "b5@0foimsc4voiae65ffk2ijaZPL#Sc24",
		longitude: -111.83035428074537,
		latitude: 33.58395923524062,
	},

	{
		firstName: "Oscar",
		lastName: "de la Hoya",
		email: "o@delahoya.com",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Oscar_De_La_Hoya%2C_Feb_2011.jpg/800px-Oscar_De_La_Hoya%2C_Feb_2011.jpg",
		mobile: 4805517000,
		availableTo: futureUTC,
		address: "10855 North 116th Street",
		city: "Scottsdale",
		state: "AZ",
		userType: "player",
		uid: "d6@0foimsc$4voiae65ffk2ijaZPL#Sc24",
		longitude: -111.83014433938388,
		latitude: 33.58476130671783,
	},

	{
		firstName: "Perez",
		lastName: "Sergio",
		email: "p@sergio.com",
		imageUrl:
			"https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/perez.jpg.img.1536.high.jpg",
		mobile: 4804434656,
		availableTo: futureUTC,
		address: "10769 North Frank Lloyd Wright Blvd #A-100",
		city: "Scottsdale",
		state: "AZ",
		userType: "player",
		uid: "j226@0fofoimsc$4voIae65ffk2ijaZPL#Sc24",
		longitude: -111.8333189726488,
		latitude: 33.5840093740919,
	},

	{
		firstName: "Quinton",
		lastName: "Jackson",
		email: "q@jackson.com",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/8/89/02-09JUL2019_CNGB_USO_Tour_2019_190705-F-WH816-1016_%2848531457487%29_%28cropped%29.jpg",
		mobile: 4803331900,
		availableTo: 0,
		address: "13255 North Eagle Ridge Drive",
		city: "Scottsdale",
		state: "AZ",
		userType: "trainer",
		uid: "#k3126@0fofoimsc$4voIae65ffk2ijaZPL#Sc24",
		longitude: -111.76304815805902,
		latitude: 33.60525392599031,
	},

	/// 10019 NYC 10019 NYC 10019 NYC 10019 NYC 10019 NYC 10019 NYC 10019 NYC
	/// 10019 NYC 10019 NYC 10019 NYC 10019 NYC 10019 NYC 10019 NYC 10019 NYC

	{
		firstName: "Romain",
		lastName: "Grosjean",
		email: "r@grosjean.com",
		imageUrl:
			"https://www.thepaddockmagazine.com/wp-content/uploads/2019/05/romain-grosjean-1050x591.jpg",
		mobile: 6462751491,
		availableTo: futureUTC,
		address: "230 5th Avenue",
		city: "New York",
		state: "NY",
		userType: "player",
		uid: "@d311aK126@0fofoimsc$4voIae65ffk2ijaZPL#Sc24",
		longitude: -73.98811301156721,
		latitude: 40.74397424727543,
	},

	{
		firstName: "Steph",
		lastName: "Curry",
		email: "s@curry.com",
		imageUrl:
			"https://cdn.vox-cdn.com/thumbor/YQLM135mS6silnUhtR8hWJX1yEk=/0x0:2636x3955/1400x933/filters:focal(1119x855:1539x1275):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66566857/1205394911.jpg.0.jpg",
		mobile: 6469171493,
		availableTo: futureUTC,
		address: "838 Brook Avenue",
		city: "New York",
		state: "NY",
		userType: "player",
		uid: "zEk111aK126@0fofoimsc$4voIae65ffk2ijaZPL#Sc24",
		longitude: -73.91059408031542,
		latitude: 40.82179181339087,
	},

	{
		firstName: "Thierry",
		lastName: "Henry",
		email: "t@henry.com",
		imageUrl:
			"https://tmssl.akamaized.net/images/foto/galerie/thierry-henry-arsenal-jubel-2012-1592828479-41984.jpg",
		mobile: 9171234563,
		availableTo: futureUTC,
		address: "928 8th Avenue",
		city: "New York",
		state: "NY",
		userType: "player",
		uid: "0ofoimsc$4voIae65ffk2ijaZPL#SD93",
		longitude: -73.98373599671615,
		latitude: 40.76525212347352,
	},
];
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const venues = [
	{
		email: "paul@gmail.com",
		password: "12345678",
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
		email: "curt@gmail.com",
		password: "12345678",
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
		email: "rhonda@gmail.com",
		password: "12345678",
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
		email: "courtney@gmail.com",
		password: "12345678",
		name: "Courtney Fields' Courts & Fields",
		address: "105 West 28th Street",
		city: "NY",
		state: "NY",
		description: "football fields and basketball courts. Volleyball too!",
		hours: "6a to 11p",
		imageUrl:
			"https://images.unsplash.com/photo-1443029433954-f508cb9936b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
		latitude: 40.746472,
		longitude: -73.990957,
	},

	{
		email: "drum@gmail.com",
		password: "12345678",
		name: "Drum Point Sports Complex",
		address: "Brick Boulevard",
		city: "Brick Township",
		state: "NJ",
		description: "Skate park, dog parks, baseball & basketball",
		hours: "730a to 4p",
		imageUrl:
			"https://fastly.4sqi.net/img/general/600x600/36698354_qN0gwHHd-8jryGYJMkI8i1oW7B469u8E2cXHf7Mrsyw.jpg",
		latitude: 40.04160778453462,
		longitude: -74.13783195868344,
	},

	{
		email: "philly@gmail.com",
		password: "12345678",
		name: "Philadelphia Sports Complex Special Services District",
		address: "3300 South 7th Street Suite #1",
		city: "Philadelphia",
		state: "PA",
		description: "PSCSSD offers every known sport.",
		hours: "730a to 4p",
		imageUrl: "https://storage.googleapis.com/clio-images/12981.22386.jpg",
		latitude: 39.906594516524855,
		longitude: -75.16318365087093,
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
	{
		status: "active",
		userId: 1,
		sportId: 2,
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

const sports = [
	{
		name: "Soccer",
		imageUrl: "https://cdn-icons-png.flaticon.com/512/1165/1165187.png",
	},
	{
		name: "Basketball",
		imageUrl: "https://cdn-icons-png.flaticon.com/512/3437/3437601.png",
	},
	{
		name: "Baseball",
		imageUrl: "https://cdn-icons-png.flaticon.com/512/484/484482.png",
	},
	{
		name: "Football",
		imageUrl: "https://cdn-icons-png.flaticon.com/512/2813/2813821.png",
	},
	{
		name: "Tennis",
		imageUrl: "https://cdn-icons-png.flaticon.com/512/5147/5147762.png",
	},
	{
		name: "Volleyball",
		imageUrl: "https://cdn-icons-png.flaticon.com/512/5496/5496293.png",
	},
	{
		name: "Hockey",
		imageUrl: "https://cdn-icons-png.flaticon.com/512/239/239260.png",
	},
];

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
				await Sport.create(sport);
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
		const user1 = await User.findByPk(1);
		const user2 = await User.findByPk(2);

		const conversation1 = await Conversation.create();

		await conversation1.addUser(user1);
		await conversation1.addUser(user2);

		await ConversationMessage.create({
			senderId: user1.id,
			content: "Hello",
			conversationId: conversation1.id,
		});
		const user3 = await User.findByPk(3);

		const conversation2 = await Conversation.create();

		await conversation2.addUser(user1);
		await conversation2.addUser(user3);

		await ConversationMessage.create({
			senderId: user3.id,
			content: "Yes",
			conversationId: conversation2.id,
		});

		console.log("Seeding success, Pacman! ");
		db.close();
	} catch (err) {
		console.error("Oh noes! Something went wrong! catch block, seed.JS");
		console.error(err);
		db.close();
	}
};

seed();
