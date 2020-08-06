const express = require('express'), bodyParser = require('body-parser'), jsonWebToken = require('jsonwebtoken')
const tokenSignature = "secretTokenSignature"

const createToken = (username) => {
    const token = jsonWebToken.sign({ username }, tokenSignature, { expiresIn: "2h" })
    return token
}

const getUserToken = (req, res) => {
    const token = createToken(req.username)
    res.status(200).json({ token, role: req.role })
}

const getUserTokenRoute = express.Router()
getUserTokenRoute.post('/', bodyParser.json(), getUserToken)
module.exports = getUserTokenRoute
