const request = require("supertest");

const server = require("./server");

describe("server", () => {
	it("returns api: running object", () => {
		return request(server)
			.get("/")
			.then((res) => {
				expect(res.body).toEqual({ api: "running" });
			});
	});
});
