const request = require("supertest");

const server = require("../api/server");
const db = require("../data/dbConfig");

describe("auth routes", () => {
	describe("POST /api/auth/register", () => {
		it("returns 400 error if user object does not match schema", () => {
			return request(server)
				.post("/api/auth/register")
				.then((res) => expect(res.status).toBe(400));
		});
		it("returns created user", () => {
			return request(server)
				.post("/api/auth/register")
				.send({ username: "Colin", password: "pass" })
				.then(async (res) => {
					await db("users").where({ username: "Colin" }).del();
					return expect(res.body.username).toBe("Colin");
				});
		});
		it("adds user to database", () => {
			return request(server)
				.post("/api/auth/register")
				.send({ username: "Colin", password: "pass" })
				.then(() => {
					return db("users")
						.where({ username: "Colin" })
						.first()
						.then(async (user) => {
							await db("users").where({ username: "Colin" }).del();
							return expect(user.username).toBe("Colin");
						});
				});
		});
	});

	describe("POST /api/auth/login", () => {
		it("returns 400 error if username and password not provided", () => {
			return request(server)
				.post("/api/auth/login")
				.then((res) => expect(res.status).toBe(400));
		});
		it("returns 401 error if not authenticated", () => {
			return request(server)
				.post("/api/auth/login")
				.send({ username: "No", password: "No" })
				.then((res) => expect(res.status).toBe(401));
		});
		it("returns JWT if authenticated", () => {
			return request(server)
				.post("/api/auth/login")
				.send({ username: "Jim", password: "pass" })
				.then((res) => expect(res.body).toHaveProperty("token"));
		});
	});
});
