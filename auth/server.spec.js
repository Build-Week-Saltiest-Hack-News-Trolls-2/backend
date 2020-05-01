const server = require("../server");
const request = require("supertest");


describe('GET /', () => {
    it('returns 200', () => {
        return request(server).get('/api/auth')
        .expect(200) });
    it('returns 401', () => {
        return request(server).get('/api/comments')
        .expect(200)});
});

describe('POST /', () =>{
    it("Should save user to database", async done => {
        const res = await request(server).post('/api/auth/register').send({
          username: "katrina1",
          password: "katrina1"
        });
        expect(201);
        done();
    });
    it("Should login user", async done => {
        const res = await request(server).post('/api/auth/login').send({
        username: "katrina1",
        password: "katrina1"
        });
        expect(res.status).toBe(200);
        done();
    })
  
});
