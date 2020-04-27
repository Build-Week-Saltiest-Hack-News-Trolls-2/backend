const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
	const user = req.body;

	if (user.username && user.password) {
		const hash = bcrypt.hashSync(user.password, 10);
		user.password = hash;

		Users.createUser(user)
			.then((user) => res.status(201).json(user))
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err.message });
			});
	} else {
		res.status(400).json({ message: "Must include username and password" });
	}
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	if (username && password) {
		Users.getUserBy({ username })
			.then((user) => {
				if (user && bcrypt.compareSync(password, user.password)) {
					const token = generateToken(user);

					res.status(200).json({ token });
				} else {
					res.status(401).json({ message: "Invalid username or password" });
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err.message });
			});
	} else {
		res.status(400).json({ message: "Must include username and password" });
	}
});

function generateToken({ username }) {
	const payload = {
		username,
	};

	const options = {
		expiresIn: "1d",
	};

	return jwt.sign(payload, process.env.JWT_SECRET || "secret", options);
}

module.exports = router;
