  
exports.up = function (knex) {
	return knex.schema.createTable("faves", tbl => {
        tbl.increments("faveID");
        tbl.integer("commentID").notNullable();
		tbl.string("author", 255).notNullable();
        tbl.string("text", 255).notNullable();
        tbl.boolean("saved").defaultTo(true);
        tbl.integer("userID").notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("faves");
};




///user - userID username password
///comments - commentID author text saltiness savedStatus?
//How to associate saved with userID....
// on comment, click save> posts comment to faves table. 
//can delete from faves table by clicking unsave
//savedStatus...indicated? on comment database?