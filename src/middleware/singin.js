"use strict"
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userCollection } = require('../models/index')

async function signinMiddleware(req, res, next) {
    if (req.headers.authorization) {
        let basicHeaderParts = req.headers.authorization.split(' ');
        // console.log('basicHeaderParts >>> ', basicHeaderParts);
        let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
        // console.log('encodedPart >>> ', encodedPart);
        let decoded = base64.decode(encodedPart); //username:password
        // console.log('decoded >>> ', decoded);
        let [username, password] = decoded.split(':'); //[username: password]
        // console.log('username');
        try {
            const user = await userCollection.readRecord(username);
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                res.status(200).json(user)
                next()
            } else {
                res.stauts(403).json('please, the( username) or (password) Incorrect, try again.')
            }
        } catch (error) {
            res.stauts(403).json('Error : the auth failed.')
        }
    }
}
module.exports=signinMiddleware





