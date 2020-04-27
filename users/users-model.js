const db = require("../data/dbConfig");

module.exports = {
	getUsers,
	getUserBy,
	createUser,
};

function getUsers() {
	return db("users").select("id", "username");
}

function getUserBy(filter) {
	return db("users").where(filter).first();
}

function createUser(user) {
	return db("users")
		.insert(user)
		.then(([id]) => getUserBy({ id }));
}
