const express = require("express"), bodyParser = require("body-parser")
const { addUserToDatabase } = require("../userServices")

const guestUser = (req, res) => {
    res.json({ username: "you are a guest" })
}


const userRouter = express.Router()

userRouter.route('/add').post(bodyParser.json(), addUserToDatabase)
//userRouter.route('/check').get(bodyParser.json(),)
userRouter.route("/guest").get(guestUser)

module.exports = userRouter