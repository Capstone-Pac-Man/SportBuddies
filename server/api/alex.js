// Alex routes
const router = require("express").Router();
const User = require("../db/models/User")
const UserSport = require("../db/models/UserSport")

// POST api/users/
router.post("/", async (req, res, next) => {
	try {
		const { name, email, mobile, password } = req.body;
		const user = await User.create({
			name: name,
			email: email,
			mobile : mobile,
			password: password,
		});
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

// api/users/me
router.get('/me', async (req, res, next) => {
	try {
	  const user = await User.findOne({
        where: {
            uid : req.params.uid
        },
		include: [{
			model:UserSport,
		}],
	  })
	  res.json(user)
	} catch (error) {
	  next(error)
	}
})