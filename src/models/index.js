"use strict"
const { Sequelize, DataTypes } = require('sequelize')
const users = require('./user')
const Collection = require("./collection-class")
require('dotenv').config()

const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.POSTGRES_URL; // npm i sqlite3

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

const sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions)
const userModel = users(sequelize, DataTypes)
const userCollection = new Collection(userModel)

module.exports = {
    DB: sequelize,
    userCollection: userCollection
}