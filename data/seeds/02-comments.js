exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("comments")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("comments").insert([
				{ id: 1, user: "H@x0r", comment: "Woo!", sentiment: "positive" },
				{
					id: 2,
					user: "H@x0r",
					comment: "Bad. Bad. Bad.",
					sentiment: "negative",
				},
				{
					id: 3,
					user: "patio11",
					comment: "You should charge more.",
					sentiment: "neutral",
				},
			]);
		});
};
