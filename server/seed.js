const {
	db,
	User,
	Sport,
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
			"https://images.unsplash.com/photo-1598623335306-5d0040e41f4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
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
			"https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
			"https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 6097995273,
		availableTo: futureUTC,
		address: "77 Melrose Terrace",
		city: "Long Branch",
		state: "NJ",
		userType: "trainer",
		uid: "f90e4jgkj23j99efef7",
		longitude: -73.98045358326493,
		latitude: 40.3018578829103,
	},
	{
		//08724 ,
		firstName: "Samuel",
		lastName: "Clark",
		email: "s@clark.com",
		imageUrl:
			"https://images.unsplash.com/photo-1616271049250-02a7697e99ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1913&q=80",
		mobile: 7398434780,
		availableTo: futureUTC,
		address: "182 Briar Mills Drive",
		city: "Brick",
		state: "NJ",
		userType: "player",
		uid: "f90e4efefefefee",
		longitude: -74.13346652314588,
		latitude: 40.10879272914463,
	},
	{
		//08724 ,
		firstName: "Thomas",
		lastName: "Green",
		email: "t@green.com",
		imageUrl:
			"https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		mobile: 4476197079,
		availableTo: futureUTC,
		address: "1 Darley Cir",
		city: "Brick",
		state: "NJ",
		userType: "player",
		uid: "f9eu32832j9432",
		longitude: -74.13704591695847,
		latitude: 40.091366926972185,
	},
	{
		//08724 ,
		firstName: "Charles",
		lastName: "Hall",
		email: "c@hall.com",
		imageUrl:
			"https://images.unsplash.com/photo-1584890131712-18ee8e3ed49c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
		mobile: 3745197512,
		availableTo: futureUTC,
		address: "3213 Danskin Rd",
		city: "Wall",
		state: "NJ",
		userType: "player",
		uid: "3roeu32832wnfwf",
		longitude: -74.07369616583341,
		latitude: 40.18669431438272,
	},
	{
		//08724 ,
		firstName: "Jessica",
		lastName: "Brown",
		email: "j@brown.com",
		imageUrl:
			"https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&q=80",
		mobile: 3745197412,
		availableTo: futureUTC,
		address: "11 Muncy Dr",
		city: "West Long Branch",
		state: "NJ",
		userType: "player",
		uid: "37374e21enndjifweifm",
		longitude: -74.02842296511224,
		latitude: 40.28841197391286,
	},
	{
		//08724 ,
		firstName: "Malcolm",
		lastName: "King",
		email: "m@king.com",
		imageUrl:
			"https://images.unsplash.com/photo-1523703591032-c582f1eedf32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 2594201205,
		availableTo: futureUTC,
		address: "26 Borden St",
		city: "Shrewsbury",
		state: "NJ",
		userType: "player",
		uid: "37374e21enndjifweifm",
		longitude: -74.05694482988955,
		latitude: 40.32921878868069,
	},
	{
		//08724 ,
		firstName: "Jason",
		lastName: "Lee",
		email: "j@lee.com",
		imageUrl:
			"https://images.unsplash.com/photo-1601025678763-e8f5835995db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 9145917563,
		availableTo: futureUTC,
		address: "59 Stonehenge Dr",
		city: "Lincroft",
		state: "NJ",
		userType: "player",
		uid: "3efkwifwfow",
		longitude: -74.1207411288082,
		latitude: 40.33551404776102,
	},
	{
		//08724 ,
		firstName: "Tyson",
		lastName: "Walker",
		email: "t@walker.com",
		imageUrl:
			"https://images.unsplash.com/photo-1521138054413-5a47d349b7af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
		mobile: 9145917773,
		availableTo: futureUTC,
		address: "7 Green Hill Rd",
		city: "Colts Neck",
		state: "NJ",
		userType: "player",
		uid: "3efkw334343kgerjg",
		longitude: -74.19211735830928,
		latitude: 40.300329428445664,
	},
	{
		//08724 ,
		firstName: "Linda",
		lastName: "Star",
		email: "l@star.com",
		imageUrl:
			"https://images.unsplash.com/photo-1617063477731-70a757d24619?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 9145917790,
		availableTo: futureUTC,
		address: "1004 Sterling Ridge",
		city: "Colts Neck",
		state: "NJ",
		userType: "player",
		uid: "3efkefefewmbcowfg",
		longitude: -74.19999472041502,
		latitude: 40.30549793277205,
	},
	{
		//08724 ,
		firstName: "Barbara",
		lastName: "Lewis",
		email: "b@lewis.com",
		imageUrl:
			"https://images.unsplash.com/photo-1622599518895-be813cc42628?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		mobile: 9947456005,
		availableTo: futureUTC,
		address: "100 Harding Rd",
		city: "Red Bank",
		state: "NJ",
		userType: "trainer",
		uid: "3efkefefe3irhi3owfg",
		longitude: -74.06053057718074,
		latitude: 40.347926561845874,
	},
	{
		//08724 ,
		firstName: "Susan",
		lastName: "Perez",
		email: "susan@perez.com",
		imageUrl:
			"https://images.unsplash.com/photo-1560233026-ad254fa8da38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=959&q=80",
		mobile: 8907456005,
		availableTo: futureUTC,
		address: "149 Atlantic Ave",
		city: "Long Branch",
		state: "NJ",
		userType: "player",
		uid: "3efkefefke0of2o3mfe",
		longitude: -73.98751626433715,
		latitude: 40.31951133066343,
	},
	{
		//08724 ,
		firstName: "Steven",
		lastName: "Rodriguez",
		email: "s@rodriguez.com",
		imageUrl:
			"https://images.unsplash.com/flagged/photo-1574660879705-48123e1ac163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
		mobile: 8907656005,
		availableTo: futureUTC,
		address: "70 Whalepond Rd",
		city: "West Long Branch",
		state: "NJ",
		userType: "player",
		uid: "3efkefefke0of2o733jfjee",
		longitude: -74.02809520486082,
		latitude: 40.278490116802104,
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
			"https://images.unsplash.com/photo-1584537229287-2ef4164d662e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
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
			"https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
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
			"https://images.unsplash.com/photo-1588731234159-8b9963143fca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
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
			"https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=970&q=80",
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
	{
		firstName: "Sarah",
		lastName: "Turner",
		email: "s@turner.com",
		imageUrl:
			"https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80",
		mobile: 1234567809,
		availableTo: futureUTC,
		address: "218 E 31st St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "helloo3r3rlddd1234567",
		longitude: -73.97867588560692,
		latitude: 40.74348069604305,
	},
	{
		firstName: "Michael",
		lastName: "Harris",
		email: "m@harris.com",
		imageUrl:
			"https://images.unsplash.com/photo-1593504197189-c0dafb6f2e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 5772985350,
		availableTo: futureUTC,
		address: "18 Clifton Pl",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "rgr32r2rfvfwefdd1234567",
		longitude: -73.9638805655829,
		latitude: 40.68749617752051,
	},
	{
		firstName: "Richard",
		lastName: "Mason",
		email: "r@mason.com",
		imageUrl:
			"https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 5772983450,
		availableTo: futureUTC,
		address: "368 Clinton St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewefwefwgr23r1234567",
		longitude: -73.99732090530058,
		latitude: 40.684623824232396,
	},
	{
		firstName: "Karen",
		lastName: "Carter",
		email: "k@carter.com",
		imageUrl:
			"https://images.unsplash.com/photo-1554244933-d876deb6b2ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
		mobile: 6992983450,
		availableTo: futureUTC,
		address: "1058 52nd St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "helweeero3r2r2r23r1234567",
		longitude: -73.99919460089936,
		latitude: 40.636415826874334,
	},
	{
		firstName: "Jane",
		lastName: "Robinson",
		email: "j@robinson.com",
		imageUrl:
			"https://images.unsplash.com/photo-1528162841823-9e55a8cc2f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		mobile: 6992989870,
		availableTo: futureUTC,
		address: "618 47th St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewiwjefo3r2r2r23r1234567",
		longitude: -74.00598299705645,
		latitude: 40.64506738142479,
	},
	{
		firstName: "Adam",
		lastName: "Moore",
		email: "a@moore.com",
		imageUrl:
			"https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80",
		mobile: 8322989870,
		availableTo: futureUTC,
		address: "1338 Bergen St",
		city: "Brooklyn",
		state: "NY",
		userType: "trainer",
		uid: "hewiwj2e2e3refe2r23r1234567",
		longitude: -73.9405129468525,
		latitude: 40.6754513279119,
	},
	{
		firstName: "David",
		lastName: "Allen",
		email: "d@allen.com",
		imageUrl:
			"https://images.unsplash.com/photo-1608138278561-4b1ade407411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 8300089870,
		availableTo: futureUTC,
		address: "1291 Dean St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewiwj2e2e3ekife2r23r1234567",
		longitude: -73.9461519396952,
		latitude: 40.6770074909057,
	},
	{
		firstName: "Betty",
		lastName: "Garcia",
		email: "b@garcia.com",
		imageUrl:
			"https://images.unsplash.com/photo-1616279968481-f8717a710ef6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
		mobile: 7320089870,
		availableTo: futureUTC,
		address: "37 S 8th St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewiw934kkgpcs34567",
		longitude: -73.96790339325747,
		latitude: 40.71017897008109,
	},
	{
		firstName: "Brian",
		lastName: "Miller",
		email: "b@miller.com",
		imageUrl:
			"https://images.unsplash.com/photo-1590696725121-f2212e9d90d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
		mobile: 8001089870,
		availableTo: futureUTC,
		address: "152 S 4th St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewiw9lhttevhes34567",
		longitude: -73.96203233233278,
		latitude: 40.711540087559925,
	},
	{
		firstName: "Patricia",
		lastName: "Young",
		email: "p@young.com",
		imageUrl:
			"https://images.unsplash.com/photo-1544298621-77b4ec9c2903?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1328&q=80",
		mobile: 7651089870,
		availableTo: futureUTC,
		address: "191 S 2nd St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewjetetacc4567",
		longitude: -73.95990802279293,
		latitude: 40.71268675871246,
	},
	{
		firstName: "William",
		lastName: "Wilson",
		email: "w@wilson.com",
		imageUrl:
			"https://images.unsplash.com/photo-1553451310-1416336a3cca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
		mobile: 7661089870,
		availableTo: futureUTC,
		address: "695 E 3rd St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewje23r32vfdsa567",
		longitude: -73.97559782570528,
		latitude: 40.63504384556317,
	},
	{
		firstName: "Matthew",
		lastName: "Baker",
		email: "m@baker.com",
		imageUrl:
			"https://images.unsplash.com/photo-1612561634367-c224fbb2cabb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
		mobile: 8651089870,
		availableTo: futureUTC,
		address: "677 E 2nd St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewjetet3e3rdsf567",
		longitude: -73.97638027744867,
		latitude: 40.63460382711559,
	},
	{
		firstName: "Ashley",
		lastName: "Scott",
		email: "a@scott.com",
		imageUrl:
			"https://images.unsplash.com/photo-1593164842249-d74fc06dae05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 7987089870,
		availableTo: futureUTC,
		address: "1148 Ovington Ave",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewjete4t4gdsgs67",
		longitude: -74.00677500554436,
		latitude: 40.62598318612282,
	},
	{
		firstName: "Margaret",
		lastName: "Wright",
		email: "m@wright.com",
		imageUrl:
			"https://images.unsplash.com/photo-1584863495140-a320b13a11a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=973&q=80",
		mobile: 7313404243,
		availableTo: futureUTC,
		address: "2461 E 23rd St",
		city: "Brooklyn",
		state: "NY",
		userType: "player",
		uid: "hewjete9ut4gdsgs67",
		longitude: -73.94675238947637,
		latitude: 40.59170147595324,
	},
	{
		firstName: "Anna",
		lastName: "Lopez",
		email: "a@lopez.com",
		imageUrl:
			"https://images.unsplash.com/photo-1606902965551-dce093cda6e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
		mobile: 7887089870,
		availableTo: futureUTC,
		address: "309 Cherry St",
		city: "Manhattan",
		state: "NY",
		userType: "player",
		uid: "hewjeefef3rmlaxa",
		longitude: -73.98759419788145,
		latitude: 40.7129603688336,
	},
	{
		firstName: "Emily",
		lastName: "Gray",
		email: "e@gray.com",
		imageUrl:
			"https://images.unsplash.com/photo-1518617840859-acd542e13a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2104&q=80",
		mobile: 2372455452,
		availableTo: futureUTC,
		address: "309 Henry St",
		city: "Manhattan",
		state: "NY",
		userType: "player",
		uid: "hewjeeflwdrmlaxa",
		longitude: -73.98233427168458,
		latitude: 40.71428327022568,
	},
];

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
	{
		venueId: 5,
		sportId: 2,
	},
	{
		venueId: 6,
		sportId: 1,
	},
];

const moreVenues = [
	{
		email: "central@gmail.com",
		password: "12345678",
		name: "Central Park",
		address: "14 E 60th St, New York, NY 10022",
		city: "New York",
		state: "NY",
		description:
			"Central Park is an urban park in New York City located between the Upper West and Upper East Sides of Manhattan. It is the most visited urban park in the United States and one of the most filmed locations in the world.",
		latitude: 40.7647215,
		longitude: -73.9721745,
		sports: [
			"Basketball",
			"Baseball",
			"Soccer",
			"Football",
			"Tennis",
			"Volleyball",
		],
		hours: "6am to 1am",
		imageUrl:
			"https://a.cdn-hotels.com/gdcs/production116/d1103/0ffba831-3af6-4ec5-918b-edd67a21480e.jpg?impolicy=fcrop&w=800&h=533&q=medium",
	},
	{
		email: "golden@gmail.com",
		password: "12345678",
		name: "Golden Gate Park",
		address: "501 Stanyan St, San Francisco, CA 94117",
		city: "San Francisco",
		state: "CA",
		description:
			"Golden Gate Park is a large urban park consisting of 1,017 acres of public grounds in San Francisco, California. It is similar in shape but 20% larger than Central Park in New York.",
		latitude: 37.7694209,
		longitude: -122.4857421,
		sports: ["Baseball", "Soccer", "Tennis"],
		hours: "5am to 12am",
		imageUrl:
			"https://assets3.cbsnewsstatic.com/hub/i/r/2021/02/27/315017ac-dbd7-436e-8211-c4b271f63564/thumbnail/1200x630/cc7184e7060044027add645b27b668fe/Tennis-GG-Park-GOLDMAN-01.jpg",
	},
	{
		email: "griffith@gmail.com",
		password: "12345678",
		name: "Griffith Park",
		address: "4730 Crystal Springs Dr, Los Angeles, CA 90027",
		city: "Los Angeles",
		state: "CA",
		description:
			"Griffith Park is a large municipal park at the eastern end of the Santa Monica Mountains, in the Los Feliz neighborhood of Los Angeles, California. The park covers 4,310 acres of land, making it one of the largest urban parks in North America.",
		latitude: 34.1367205,
		longitude: -118.2947525,
		sports: ["Baseball", "Soccer", "Tennis"],
		hours: "5am to 10pm",
		imageUrl:
			"https://livingnewdeal.org/wp-content/uploads/2015/10/Tennis05.jpg",
	},
	{
		email: "grant@gmail.com",
		password: "12345678",
		name: "Grant Park",
		address: "337 E Randolph St, Chicago, IL 60601",
		city: "Chicago",
		state: "IL",
		description:
			"Grant Park is a large urban park in downtown Chicago, Illinois. The park is bounded by Michigan Avenue to the east, Columbus Drive to the west, Randolph Street to the north, and Roosevelt Road to the south. It is also known as 'Chicago's front yard'.",
		latitude: 41.881624,
		longitude: -87.6239069,
		sports: [
			"Basketball",
			"Baseball",
			"Soccer",
			"Football",
			"Tennis",
			"Volleyball",
		],
		hours: "6am to 11pm",
		imageUrl:
			"https://greatruns.com/wp-content/uploads/2016/11/Grant-Park-T.jpg",
	},
	{
		email: "fairmount@gmail.com",
		password: "12345678",
		name: "Fairmount Park",
		address: "Reservoir Dr, Philadelphia, PA 19121",
		city: "Philadelphia",
		state: "PA",
		description:
			"Fairmount Park is the largest municipal park in Philadelphia, Pennsylvania and the largest landscaped urban park in the United States. It is made up of 63 different neighborhoods, covering 2,052 acres.",
		latitude: 39.9921051,
		longitude: -75.1793732,
		sports: ["Baseball", "Soccer", "Football", "Tennis", "Basketball"],
		hours: "6am to 11pm",
		imageUrl:
			"https://myphillypark.org/app/uploads/2022/06/52029343663_518045dbbb_k-825x550.jpg",
	},
	{
		email: "brooklynbridge@gmail.com",
		password: "12345678",
		name: "Brooklyn Bridge Park",
		address: "334 Furman St, Brooklyn, NY 11201",
		city: "Brooklyn",
		state: "NY",
		description:
			"Brooklyn Bridge Park is a waterfront park in Brooklyn that offers stunning views of the Manhattan skyline. It features several sports fields and courts, including soccer, basketball, volleyball, and handball.",
		latitude: 40.7025,
		longitude: -73.9967,
		sports: ["Soccer", "Basketball", "Volleyball"],
		hours: "6am to 1am",
		imageUrl:
			"https://www.turnerconstruction.com/Files/ProjectImage?url=%2Fsites%2Fmarketingstories%2FMarketing%2520Story%2520Images%2Foriginal.b1af7fa2-54d7-4166-b86c-fcfdab3d23e1.jpg&width=707&height=470&crop=True&jpegQuality=95",
	},

	{
		email: "hudson@gmail.com",
		password: "12345678",
		name: "Hudson River Park",
		address: "353 West St, New York, NY 10014",
		city: "New York",
		state: "NY",
		description:
			"Hudson River Park is a scenic park along the Hudson River in Manhattan that offers various sports fields and courts, including basketball, soccer, volleyball, and tennis. It also has a skate park and a bike path.",
		latitude: 40.7358,
		longitude: -74.0086,
		sports: ["Basketball", "Soccer", "Volleyball", "Tennis"],
		hours: "6am to 1am",
		imageUrl:
			"https://hudsonriverpark.org/app/uploads/2012/03/Sponsor-HRPK-Volleyball-AVP-12.jpg",
	},

	{
		email: "randall@gmail.com",
		password: "12345678",
		name: "Randall's Island Park",
		address: "20 Randall's Island Park, New York, NY 10035",
		city: "New York",
		state: "NY",
		description:
			"Randall's Island Park is a large park on an island in the East River that features several sports fields and courts, including baseball, soccer, tennis, and golf. It also has a bike path and a running track.",
		latitude: 40.7932,
		longitude: -73.9219,
		sports: ["Baseball", "Soccer", "Tennis"],
		hours: "6am to 1am",
		imageUrl:
			"https://static01.nyt.com/images/2010/06/14/nyregion/randalls/randalls-articleLarge.jpg",
	},

	{
		email: "flushing@gmail.com",
		password: "12345678",
		name: "Flushing Meadows Corona Park",
		address: "Grand Central Pkwy, Queens, NY 11368",
		city: "Queens",
		state: "NY",
		description:
			"Flushing Meadows Corona Park is a large park in Queens that features several sports fields and courts, including baseball, soccer, tennis, and basketball. It also has a boating lake and a playground.",
		latitude: 40.7449,
		longitude: -73.8448,
		sports: ["Baseball", "Soccer", "Tennis", "Basketball"],
		hours: "6am to 1am",
		imageUrl:
			"https://static01.nyt.com/images/2011/08/26/arts/26JPFLUSHING5/26JPFLUSHING5-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
	},
	{
		email: "zilker@gmail.com",
		password: "12345678",
		name: "Zilker Metropolitan Park",
		address: "2100 Barton Springs Rd, Austin, TX 78746",
		city: "Austin",
		state: "TX",
		description:
			"Zilker Metropolitan Park is a large park in Austin that offers various sports fields and courts, including soccer, volleyball, and basketball. It also has a disc golf course, a hiking trail, and a swimming pool.",
		latitude: 30.2669,
		longitude: -97.7724,
		sports: ["Soccer", "Volleyball", "Basketball"],
		hours: "5am to 10pm",
		imageUrl: "https://live.staticflickr.com/8042/8059495886_f8baf3902b_b.jpg",
	},

	{
		email: "katy@gmail.com",
		password: "12345678",
		name: "Katy Park",
		address: "24927 Morton Rd, Katy, TX 77493",
		city: "Katy",
		state: "TX",
		description:
			"Katy Park is a large park in Katy that features several sports fields and courts, including baseball, soccer, and tennis. It also has a playground and a picnic area.",
		latitude: 29.8013,
		longitude: -95.8307,
		sports: ["Baseball", "Soccer", "Tennis"],
		hours: "6am to 10pm",
		imageUrl:
			"https://fastly.4sqi.net/img/general/600x600/MGTQDV5HNSSPWQW5Z2C4XU5VSX02DYQJQL2GBA45ZBXS1T1K.jpg",
	},

	{
		email: "memorial@gmail.com",
		password: "12345678",
		name: "Memorial Park",
		address: "6501 Memorial Dr, Houston, TX 77007",
		city: "Houston",
		state: "TX",
		description:
			"Memorial Park is a large park in Houston that offers various sports fields and courts, including baseball, soccer, and tennis. It also has a golf course, a running trail, and a fitness center.",
		latitude: 29.7637,
		longitude: -95.4486,
		sports: ["Baseball", "Soccer", "Tennis"],
		hours: "6am to 10pm",
		imageUrl:
			"https://s3-media0.fl.yelpcdn.com/bphoto/xVmfAjjU5llbf2ODPcQ5_w/348s.jpg",
	},

	{
		email: "oakpoint@gmail.com",
		password: "12345678",
		name: "Oak Point Park and Nature Preserve",
		address: "5901 Los Rios Blvd, Plano, TX 75074",
		city: "Plano",
		state: "TX",
		description:
			"Oak Point Park and Nature Preserve is a large park in Plano that features several sports fields and courts, including soccer, baseball, and volleyball. It also has a bike path, a fishing pond, and a nature preserve.",
		latitude: 33.0582,
		longitude: -96.6937,
		sports: ["Soccer", "Baseball", "Volleyball"],
		hours: "6am to 10pm",
		imageUrl:
			"https://www.putinbay.org/wp-content/uploads/2020/01/volleyballclassic.jpg",
	},
	{
		email: "clearwater@gmail.com",
		password: "12345678",
		name: "Clearwater Beach Park",
		address: "51 Bay Esplanade, Clearwater, FL 33767",
		city: "Clearwater",
		state: "FL",
		description:
			"Clearwater Beach Park is a large park in Clearwater that offers various sports fields and courts, including volleyball, basketball, and tennis. It also has a fishing pier, a playground, and a picnic area.",
		latitude: 27.979,
		longitude: -82.8252,
		sports: ["Volleyball", "Basketball", "Tennis"],
		hours: "6am to 10pm",
		imageUrl: "https://spcfc.reel-scout.com/up_images/5/md/2829115.jpg",
	},

	{
		email: "crandon@gmail.com",
		password: "12345678",
		name: "Crandon Park",
		address: "6747 Crandon Blvd, Key Biscayne, FL 33149",
		city: "Key Biscayne",
		state: "FL",
		description:
			"Crandon Park is a large park in Key Biscayne that features several sports fields and courts, including soccer, tennis, and golf. It also has a beach, a nature center, and a marina.",
		latitude: 25.7214,
		longitude: -80.1673,
		sports: ["Soccer", "Tennis", "Volleyball"],
		hours: "8am to sunset",
		imageUrl:
			"https://www.kbhistory.org/wp-content/uploads/2012/12/Beach-club-volleyball.jpg",
	},

	{
		email: "eola@gmail.com",
		password: "12345678",
		name: "Lake Eola Park",
		address: "512 E Washington St, Orlando, FL 32801",
		city: "Orlando",
		state: "FL",
		description:
			"Lake Eola Park is a large park in Orlando that offers various sports fields and courts, including basketball, tennis, and volleyball. It also has a lake, a playground, and a swan boat rental.",
		latitude: 28.5432,
		longitude: -81.3709,
		sports: ["Basketball", "Tennis", "Volleyball"],
		hours: "6am to midnight",
		imageUrl:
			"https://www.orlando.gov/files/sharedassets/public/departments/parks-amp-rec/lake-eola/lake-eola-park_prana_danielmyers.jpg",
	},

	{
		email: "bayview@gmail.com",
		password: "12345678",
		name: "Bayview Park",
		address: "2001 E Lloyd St, Pensacola, FL 32503",
		city: "Pensacola",
		state: "FL",
		description:
			"Bayview Park is a large park in Pensacola that features several sports fields and courts, including baseball, soccer, and tennis. It also has a playground, a dog park, and a boat launch.",
		latitude: 30.4481,
		longitude: -87.2007,
		sports: ["Baseball", "Soccer", "Tennis"],
		hours: "6am to 10pm",
		imageUrl:
			"https://outdoorgulfcoast.com/wp-content/uploads/2009/09/tennis-courts.jpg",
	},
	{
		email: "parktennis@gmail.com",
		password: "12345678",
		name: "Park Avenue Tennis Center",
		address: "Herbertsville Rd",
		city: "Brick Township",
		state: "NJ",
		description:
			"Park Avenue Tennis Center is the premier tennis facility in New Jersey.",
		latitude: 40.10471286774796,
		longitude: -74.10418227796161,
		sports: ["Tennis", "Soccer"],
		hours: "6am to 10pm",
		imageUrl:
			"https://images.unsplash.com/photo-1515017804404-92b19fdfe6ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2525&q=80",
	},
	{
		email: "icepalace@gmail.com",
		password: "12345678",
		name: "The Ice Palace",
		address: "197 Chambers Brg Rd",
		city: "Brick Township",
		state: "NJ",
		description:
			"The Ice Palace is Ocean County's premier ice skating facility. It's fun for the whole family. Home of the Jersey Whalers.",
		latitude: 40.06736223610942,
		longitude: -74.14562261202927,
		sports: ["Hockey", "Tennis"],
		hours: "6am to 10pm",
		imageUrl:
			"https://images.unsplash.com/photo-1515703407324-5f753afd8be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80",
	},
	{
		email: "azvol@gmail.com",
		password: "12345678",
		name: "Cholla Park Volleyball Court",
		address: "11320 E Vía Linda",
		city: "Scottsdale",
		state: "AZ",
		description: "Volleyball Court.",
		latitude: 33.59013708649252,
		longitude: -111.83866693795362,
		sports: ["Volleyball", "Football"],
		hours: "6am to 10pm",
		imageUrl:
			"https://images.unsplash.com/photo-1567781830902-685fb3401f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
	},
	{
		email: "azplay@gmail.com",
		password: "12345678",
		name: "Stonegate Equestrian Park Playground",
		address: "9555 N 120th St",
		city: "Scottsdale",
		state: "AZ",
		description: "Park playground",
		latitude: 33.57280394587407,
		longitude: -111.82034280077312,
		sports: ["Volleyball", "Football", "Tennis", "Basketball", "Soccer"],
		hours: "6am to 10pm",
		imageUrl:
			"https://images.unsplash.com/photo-1505305976870-c0be1cd39939?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
	},
	{
		email: "azbaseball@gmail.com",
		password: "12345678",
		name: "Aztec Park Baseball Field",
		address: "13636 N 100th St",
		city: "Scottsdale",
		state: "AZ",
		description: "All kind of sports",
		latitude: 33.61117480261018,
		longitude: -111.86510130483833,
		sports: [
			"Volleyball",
			"Football",
			"Tennis",
			"Basketball",
			"Soccer",
			"Baseball",
			"Hockey",
		],
		hours: "6am to 10pm",
		imageUrl:
			"https://images.unsplash.com/photo-1583960435304-37f2e1592c37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
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
			sports.map(async (sport) => {
				await Sport.create(sport);
			})
		);
		const playerSports = await Sport.findAll();

		await Promise.all(
			users.map(async (user) => {
				const randomNumber = Math.floor(Math.random() * 7);
				const currentPlayer = await User.create(user);
				await currentPlayer.addSport(playerSports[randomNumber]);
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

		await Promise.all(
			moreVenues.map(async (venue) => {
				const currentVenue = await Venue.create(venue);
				if (venue.sports) {
					venue.sports.map(async (sport) => {
						const findSport = await Sport.findOne({
							where: {
								name: sport,
							},
						});
						await currentVenue.addSport(findSport);
					});
				}
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
