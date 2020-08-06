const express = require("express"), bodyParser = require("body-parser")
const ticketModel = require('../schemas/ticket')

const addTicketToDatabase = async (req, res) => {
    console.log("Request? ", req.body)

    const user = req.body.user,price = req.body.price,flight_id = req.body.ticket

    if (user === undefined || price === undefined) {
        res.json({ error: "bad input, please have user sent" })
    }

    const ticketDB = new ticketModel({ user, price, flight_id })
    const results = await ticketDB.save()
    res.json(results)
}


const getUserTickets = async (req, res) => {
    const user = req.body.user

    const results = await ticketModel.find({ user })

    console.log(results)
    res.json(results)
}

const ticketRouter = express.Router()

ticketRouter.route('/add').post(bodyParser.json(), addTicketToDatabase)
ticketRouter.route('/find').post(bodyParser.json(), getUserTickets)

module.exports = ticketRouter