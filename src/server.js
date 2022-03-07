"use strict"
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const signinMiddleware = require('./middleware/singin')
const { userCollection } = require('./models/index')
const errorHandler = require('./error-handlers/500')
const notFound = require('./error-handlers/404')
const signinAuth = require('./middleware/singin')
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send('Welcome in Home page.')
})
app.post('/signup', signUpFunc)
app.post('/signin', signinAuth, signinFunc)



async function signUpFunc(req, res) {
    // let { username, password } = req.body;
    // console.log(`${username} and ${password}`);
    try {
        const object = req.body;
        object.password = await bcrypt.hash(req.body.password, 5);
        const user = await userCollection.createRecord(object)
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
    }
}

async function signinFunc(req, res) {
    await res.status(200).json(req.user);
}

function start(port) {
    app.listen(port, () => {
        console.log(`The server is connection on ${port}`)
    })
}

app.use(errorHandler)
app.use('*', notFound)
module.exports = {
    app: app,
    start: start
}