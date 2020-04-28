const router = require("express").Router();

const Comments = require("./comments-model");

router.get("/", (req, res) => {
	const { id } = req.decodedToken;

	Comments.getComments(id)
		.then((comments) => res.status(200).json(comments))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

router.post("/", (req, res) => {
	const comment = req.body;
	const user = req.decodedToken;

	if (comment.id && comment.user && comment.comment && comment.sentiment) {
		// Check if comment is already saved in db
		Comments.getCommentById({ id: comment.id })
			.then(async (foundComment) => {
				// save comment if not already
				if (!foundComment) {
					await Comments.createComment(comment)
						.then((comment) => (foundComment = comment))
						.catch((err) => {
							console.log(err);
							res.status(500).json({ error: err.message });
						});
				}

				// add comment to saved table
				Comments.addSavedComment(user.id, comment.id)
					.then(() => res.status(201).json(foundComment))
					.catch((err) => {
						console.log(err);
						res.status(500).json({ error: err.message });
					});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ error: err.message });
			});
	} else {
		res.status(400).json({ message: "Comment does not match schema" });
	}
});

router.delete("/:id", (req, res) => {
	const user = req.decodedToken;

	Comments.removeSavedComment(user.id, req.params.id)
		.then((comment) => res.status(200).json(comment))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

module.exports = router;
