const express = require("express"), bodyParser = require("body-parser")
const { addTicketToDatabase, returnUserTickets } = require("../ticketServices"), tokenAuth = require("../lib/tokenAuth")
const ticketRouter = express.Router()

ticketRouter.route('/add').post(bodyParser.json(), addTicketToDatabase)
ticketRouter.route('/get').get(tokenAuth, returnUserTickets)

module.exports = ticketRouter