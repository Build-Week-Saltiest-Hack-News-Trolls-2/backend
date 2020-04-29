  
exports.up = function (knex) {
	return knex.schema.createTable("faves", tbl => {
        tbl.increments("faveID");
        tbl.integer("commentID")
            .unique()
            .notNullable()
            .references('id')
            .inTable('comments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.string("author", 255)
            .notNullable()
            .references('author')
            .inTable('comments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.string("text", 255) 
            .notNullable()
            .references('text')
            .inTable('comments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.integer("saltiness")
            .notNullable()
            .references('saltiness')
            .inTable('comments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.boolean("saved")
            .defaultTo(true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("faves");
};