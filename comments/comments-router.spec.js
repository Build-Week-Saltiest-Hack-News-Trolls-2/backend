const request = require("supertest");
const jwt = require("jsonwebtoken");

const server = require("../api/server");
const db = require("../data/dbConfig");

const seededComments = [
	{
		id: 1,
		user: "H@x0r",
		comment: "Woo!",
		sentiment: "0.93",
	},
	{
		id: 2,
		user: "H@x0r",
		comment: "Bad. Bad. Bad.",
		sentiment: "-0.97",
	},
	{
		id: 3,
		user: "patio11",
		comment: "You should charge more.",
		sentiment: "0.10",
	},
];

describe("comment routes", () => {
	const token = jwt.sign({ id: 1, username: "Jack" }, "secret", {
		expiresIn: "10m",
	});

	describe("GET /api/comments/all", () => {
		it("returns 200 status", () => {
			return request(server)
				.get("/api/comments/all")
				.then((res) => expect(res.status).toBe(200));
		});
		it("returns array of saved comments", () => {
			return request(server)
				.get("/api/comments/all")
				.then((res) => expect(res.body).toEqual(seededComments));
		});
	});

	describe("GET /api/comments", () => {
		it("returns 401 error if not authenticated", () => {
			return request(server)
				.get("/api/comments")
				.then((res) => expect(res.status).toBe(401));
		});
		it("returns array of comments saved by auth user", () => {
			return request(server)
				.get("/api/comments")
				.set("Authorization", token)
				.then((res) =>
					expect(res.body).toEqual([seededComments[0], seededComments[2]])
				);
		});
	});

	describe("POST /api/comments", () => {
		it("returns 401 error if not authenticated", () => {
			return request(server)
				.post("/api/comments")
				.then((res) => expect(res.status).toBe(401));
		});
		it("returns 400 error if comment does not match schema", () => {
			return request(server)
				.post("/api/comments")
				.set("Authorization", token)
				.then((res) => expect(res.status).toBe(400));
		});
		it("returns the saved comment", () => {
			return request(server)
				.post("/api/comments")
				.set("Authorization", token)
				.send({
					id: 2,
					user: "H@x0r",
					comment: "Bad. Bad. Bad.",
					sentiment: -0.97,
				})
				.then(async (res) => {
					await db("user_comments").where({ user_id: 1, comment_id: 2 }).del();
					return expect(res.body).toEqual({
						id: 2,
						user: "H@x0r",
						comment: "Bad. Bad. Bad.",
						sentiment: "-0.97",
					});
				});
		});
		it("adds comment to user's saved comments", () => {
			return request(server)
				.post("/api/comments")
				.set("Authorization", token)
				.send({
					id: 2,
					user: "H@x0r",
					comment: "Bad. Bad. Bad.",
					sentiment: -0.97,
				})
				.then(() => {
					return db("user_comments")
						.where({ user_id: 1, comment_id: 2 })

						.first()
						.then(async (comment) => {
							await db("user_comments")
								.where({ user_id: 1, comment_id: 2 })
								.del();
							return expect(comment).toMatchObject({
								user_id: 1,
								comment_id: 2,
							});
						});
				});
		});
		it("adds saved comment to database", () => {
			return request(server)
				.post("/api/comments")
				.set("Authorization", token)
				.send({
					id: 4,
					user: "hacky",
					comment: "woohoo! I'm hacky!",
					sentiment: 0.96,
				})
				.then(() => {
					return db("comments")
						.where({ id: 4 })
						.first()
						.then(async (comment) => {
							await db("user_comments").where({ comment_id: 4 }).del();
							await db("comments").where({ id: 4 }).del();
							return expect(comment).toEqual({
								id: 4,
								user: "hacky",
								comment: "woohoo! I'm hacky!",
								sentiment: "0.96",
							});
						});
				});
		});
	});

	describe("DELETE /api/comments/:id", () => {
		it("returns 401 error if not authenticated", () => {
			return request(server)
				.delete("/api/comments/1")
				.then((res) => expect(res.status).toBe(401));
		});
		it("returns 404 error if comment does not exist", () => {
			return request(server)
				.delete("/api/comments/100000")
				.set("Authorization", token)
				.then((res) => expect(res.status).toBe(404));
		});
		describe("tests involving actually deleting a comment", () => {
			beforeEach(async (done) => {
				await db("user_comments").insert({
					user_id: 1,
					comment_id: 2,
				});
				done();
			});
			it("returns the deleted comment", () => {
				return request(server)
					.delete("/api/comments/2")
					.set("Authorization", token)
					.then((res) =>
						expect(res.body).toEqual({
							id: 2,
							user: "H@x0r",
							comment: "Bad. Bad. Bad.",
							sentiment: "-0.97",
						})
					);
			});
			it("removes the comment from database", () => {
				return request(server)
					.delete("/api/comments/2")
					.set("Authorization", token)
					.then(() => {
						return db("user_comments")
							.where({ id: 4 })
							.then((comment) => expect(comment).toHaveLength(0));
					});
			});
		});
	});
});
