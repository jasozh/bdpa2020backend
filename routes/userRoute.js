const express = require("express"), bodyParser = require("body-parser")
const { addUserToDatabase, returnUserInformation, updateUserInformation, returnUserRole, returnAllUsers, returnDeletedUser } = require("../userServices"), tokenAuth = require("../lib/tokenAuth")

const guestUser = (req, res) => {
    res.json({ email: "you are a guest" })
}

const userRouter = express.Router()
userRouter.route('/add').post(bodyParser.json(), addUserToDatabase)
userRouter.route('/get').get(tokenAuth, returnUserInformation)
userRouter.route('/update').post(tokenAuth, bodyParser.json(), updateUserInformation)
//userRouter.route('/check').get(bodyParser.json(),)
userRouter.route("/guest").get(guestUser)
userRouter.route("/getRole").get(tokenAuth, returnUserRole)
userRouter.route("/getAllUsers").get(tokenAuth, returnAllUsers)
userRouter.route("/deleteUser/:email").delete(tokenAuth, returnDeletedUser)
module.exports = userRouter