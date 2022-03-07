"use strict";

module.exports = (req, res) => {
    res.status(404).json({

        code: 404,
        message: `the page is not found please make sure from the path. `
    })
}