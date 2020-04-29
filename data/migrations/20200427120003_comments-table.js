  
exports.up = function (knex) {
	return knex.schema.createTable("comments", tbl => {
		tbl.increments();
		tbl.string("author", 120).notNullable();
        tbl.string("text", 255).notNullable();
        tbl.integer("saltiness").notNullable();
        tbl.boolean("saved").notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("comments");
};