const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decodedToken) => {
		if (err) {
			console.log(err);
			res.status(401).json({ message: "Invalid credentials" });
		} else {
			req.decodedToken = decodedToken;

			next();
		}
	});
};
