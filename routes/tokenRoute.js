const express = require('express'), bodyParser = require('body-parser'), jsonWebToken = require('jsonwebtoken')
const tokenSignature = "secretTokenSignature"

const createToken = (username) => {
    const token = jsonWebToken.sign(
        { userName },
        tokenSignature,
        { expiresIn: "2h" }
    )

    return token
}

const getUserToken = (req, res) => {

    const { userName } = req.body
    const token = createToken(userName)

    res.json({
        token,
        role: "whatever"
    })
}




const getUserTokenRoute = express.Router()

getUserTokenRoute.post('/', bodyParser.json(), getUserToken)

module.exports = getUserTokenRoute