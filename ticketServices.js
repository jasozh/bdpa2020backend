const ticketModel = require('./schemas/ticket')
const addTicketToDatabase = async (req, res) => {
    console.log("Request", req.body)
    const username = req.body.username, flight_id = req.body.flight_id
    try {
        const ticket = new ticketModel({ username, flight_id })
        const existingTicket = await ticketModel.findOne({ username, flight_id })
        if (!existingTicket) await ticket.save()
        console.log("ticket", ticket)
        res.status(200).send(ticket)
    }
    catch (err) {
        console.log(err)
        res.status(401)
    }
}

const returnUserTickets = async (req, res) => {
    const username = req.username
    const userTickets = await ticketModel.find({ username })
    console.log("userTickets", userTickets)
    if (userTickets) res.status(200).send(userTickets)
    else res.status(401).json("Tickets not found")
}

module.exports = { addTicketToDatabase, returnUserTickets } 