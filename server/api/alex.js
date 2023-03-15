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

// api/users/:id
router.get('/:id', async (req, res, next) => {
	try {
	  const user = await User.findByPk(req.params.id, {
		include: [{
			model:UserSport,
		}],
	  })
	  res.json(user)
	} catch (error) {
	  next(error)
	}
})