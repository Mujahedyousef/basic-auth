"use strict"
const { DB } = require('./src/models')
const server = require('./src/server')
require('dotenv').config()
DB.sync().then(() => {
    server.start(process.env.PORT || 3030)
}).catch(console.error)

