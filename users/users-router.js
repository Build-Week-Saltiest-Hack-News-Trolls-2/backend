const router = require("express").Router();

const Users = require("./users-model");

router.get("/", (req, res) => {
	Users.getUsers()
		.then((users) => res.status(200).json(users))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

module.exports = router;
