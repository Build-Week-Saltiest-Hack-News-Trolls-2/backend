exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("comments")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("comments").insert([
				{ id: 1, user: "H@x0r", comment: "Woo!", sentiment: 0.93 },
				{
					id: 2,
					user: "H@x0r",
					comment: "Bad. Bad. Bad.",
					sentiment: -0.97,
				},
				{
					id: 3,
					user: "patio11",
					comment: "You should charge more.",
					sentiment: 0.1,
				},
			]);
		});
};
