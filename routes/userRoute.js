const express = require("express")

const guestUser = (req, res) => {
    res.json({ userName: "you are a guest" })
}
const userRouter = express.Router()

userRouter.route("/guest").get(guestUser)

module.exports = userRouter