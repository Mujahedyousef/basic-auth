"use strict"
module.exports = (error, req, res, next) => {
    res.status(500).json({
        code: 500,
        message: `server erroe :${error}`
    })
}