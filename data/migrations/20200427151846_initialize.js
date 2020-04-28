exports.up = function (knex) {
	return knex.schema
		.createTable("users", (users) => {
			users.increments();
			users.string("username", 255).notNullable().unique();
			users.string("password", 255).notNullable();
		})
		.createTable("comments", (comments) => {
			comments.integer("id").notNullable().unique();
			comments.string("user", 255).notNullable();
			comments.text("comment").notNullable();
			comments.integer("sentiment").notNullable();
		})
		.createTable("user_comments", (userComments) => {
			userComments.increments();
			userComments
				.integer("user_id")
				.notNullable()
				.references("users.id")
				.onDelete("RESTRICT")
				.onUpdate("CASCADE");
			userComments
				.integer("comment_id")
				.notNullable()
				.references("comments.id")
				.onDelete("RESTRICT")
				.onUpdate("CASCADE");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("user_comments")
		.dropTableIfExists("comments")
		.dropTableIfExists("users");
};
