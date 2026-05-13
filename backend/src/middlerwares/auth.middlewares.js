const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.mode");

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlackListed = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlackListed) {
        return res.status(401).json({
            message: "invalid token"
        })
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (err) {

        return res.status(401).json({
            message: "invalid token"
        })



    }

}

module.exports = { authUser }