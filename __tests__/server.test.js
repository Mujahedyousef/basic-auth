"use strict"
const server = require('../src/server')
const supertest = require('supertest')
const request = supertest(server.app)
const { DB } = require('../src/models/index')


beforeAll(async () => {
    await DB.sync()
})
afterAll(async () => {
    await DB.drop()
})
describe('testing for server', () => {
    it('test for / ', async () => {
        const response = await request.get("/")
        expect(response.text).toEqual("Welcome in Home page.")
    })
    it('test for wrong path', async () => {
        const resopnse = await request.get("/notFound")
        expect(resopnse.status).toEqual(404)
    })
})

describe('basic Auth', () => {
    it('Signup', async () => {
        const response = await request.post('/signup').send({
            userName: "mujahed",
            password: "12345678"
        });
        expect(response.status).toBe(201);

    });
    it('sign in with correct account', async () => {
        const response = await request.post('/signin').auth("mujahed", "12345678");
        expect(response.status).toBe(200);

    });

    it('sign in with wrong password', async () => {
        const response = await request.post('/signin').auth("mujahed", "142582");
        expect(response.status).toBe(403);
    });
    it('sign in  wrong userName &&password', async () => {
        const response = await request.post('/signin').auth("ahamd", "fffff");
        expect(response.status).toBe(403);
    });
});
