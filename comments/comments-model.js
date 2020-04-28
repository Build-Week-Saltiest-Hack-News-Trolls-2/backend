const db = require("../data/dbConfig");

module.exports = {
	getComments,
	getCommentById,
	createComment,
	addSavedComment,
	removeSavedComment,
};

function getComments(id) {
	return db("comments")
		.join("user_comments", "comments.id", "user_comments.comment_id")
		.select(
			"comments.id",
			"comments.user",
			"comments.comment",
			"comments.sentiment"
		)
		.where({ user_id: id });
}

function getCommentById(id) {
	return db("comments").where(id).first();
}

function createComment(comment) {
	return db("comments")
		.insert(comment, ["id"])
		.then(([id]) => getCommentById(id)); // getCommentById(id)
}

function addSavedComment(user_id, comment_id) {
	return db("user_comments").insert({ user_id, comment_id });
}

function removeSavedComment(user_id, comment_id) {
	return db("user_comments")
		.where({ user_id, comment_id })
		.del()
		.then(() => getCommentById({ id: comment_id }));
}
