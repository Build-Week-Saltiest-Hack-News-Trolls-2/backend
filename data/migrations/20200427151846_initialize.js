exports.up = function (knex) {
	return knex.schema
		.createTable("users", (users) => {
			users.increments();
			users.string("username", 255).notNullable().unique();
			users.string("password", 255).notNullable();
		})
		.createTable("user_comments", (userComments) => {
			userComments.increments();
			userComments
				.integer("user_id")
				.notNullable()
				.references("users.id")
				.onDelete("RESTRICT")
				.onUpdate("CASCADE");
			userComments.integer("comment_id").notNullable();
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("users")
		.dropTableIfExists("user_comments");
};
