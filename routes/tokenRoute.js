const express = require('express'), bodyParser = require('body-parser'), jsonWebToken = require('jsonwebtoken')
const tokenSignature = "secretTokenSignature"

const createToken = (username) => {
    const token = jsonWebToken.sign({ username }, tokenSignature, { expiresIn: "2h" })
    return token
}

const getUserToken = (req, res) => {
    const username = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString('ASCII').split(":")[0] //how to pass username in arguments?
    const token = createToken(username)
    res.json({ token, role: "whatever" })
}

const getUserTokenRoute = express.Router()
getUserTokenRoute.post('/', bodyParser.json(), getUserToken)
module.exports = getUserTokenRoute
