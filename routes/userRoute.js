const express = require("express"), bodyParser = require("body-parser")
const { addUserToDatabase, returnUserInformation } = require("../userServices"), tokenAuth = require("../lib/tokenAuth")

const guestUser = (req, res) => {
    res.json({ username: "you are a guest" })
}

const userRouter = express.Router()
userRouter.route('/add').post(bodyParser.json(), addUserToDatabase)
userRouter.route('/update').get(tokenAuth, returnUserInformation)
//userRouter.route('/check').get(bodyParser.json(),)
userRouter.route("/guest").get(guestUser)

module.exports = userRouter