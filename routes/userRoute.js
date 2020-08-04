const express = require("express")
const bodyParser = require("body-parser")
const { addUserToDatabase } = require("../userInformation")

const guestUser = (req, res) => {
    res.json({ userName: "you are a guest" })
}


const userRouter = express.Router()

userRouter.route('/add').post( bodyParser.json(), addUserToDatabase)
userRouter.route("/guest").get(guestUser)

module.exports = userRouter