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
    it('test for stauts singup', async () => {
        const response = await request.post('/singup').send({
            userName: "mujahed",
            password: "12345678"
        })
        expect(response.status).toEqual(201)
    })

    it('test for stauts signin when being correct user and pass', async () => {
        const response = await request.post('/singin').auth("mujahed", "12345678")
        expect(response.status).toEqual(200)

    })

    it('test for stauts signin when being incorrect password ||userName ||both ', async () => {
        const response = await request.post('/singin').auth("test", "1234")
        expect(response.status).toEqual(403)
    })

})

