exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("user_comments")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("user_comments")
				.insert([
					{ id: 1, user_id: 1, comment_id: 1 },
					{ id: 2, user_id: 1, comment_id: 3 },
					{ id: 3, user_id: 2, comment_id: 3 },
				])
				.then(() => {
					return knex.schema.raw(
						`SELECT setval('user_comments_id_seq', (SELECT MAX(id) from "user_comments"));`
					);
				});
		});
};
