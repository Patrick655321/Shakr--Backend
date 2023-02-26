require("dotenv").config()
const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const token = req.headers['auth-token']

    if(!token) {
        return res.status(403).json({message: "Auth token missing"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
    } catch (error) {
        return res.status(401).json({message: "Not authorized"})
    }
    return next()
}

module.exports = { authenticateToken }