exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("users")
				.insert([
					{
						id: 1,
						username: "Jack",
						password:
							"$2a$10$B5wYWsCvxVv6llUOEp0ETejTbSubOe9Q1XSFxkwJF2svoOEnTvUnm",
					},
					{
						id: 2,
						username: "Jim",
						password:
							"$2a$10$5eI9D.0e.I/BbT8C3/VaG.RXwrrR/xsAhvvGrFzA5vwq590byfhPm",
					},
					{
						id: 3,
						username: "Joe",
						password:
							"$2a$10$rJJSdYtz3CqEp47Udo9KJ.ww/0J8JMH/yfmtcE9eIMshZvMlICK9u",
					},
				])
				.then(() => {
					return knex.schema.raw(
						`SELECT setval('users_id_seq', (SELECT MAX(id) from "users"));`
					);
				});
		});
};
