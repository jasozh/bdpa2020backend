const ticketModel = require('./schemas/ticket')
const addTicketToDatabase = async (req, res) => {
    console.log("Ticket Request", req.body)
    const email = req.body.email, flight_id = req.body.flight_id, seat = req.body.seat
    try {
        const ticket = new ticketModel({ email, flight_id, seat })
        const existingTicket = await ticketModel.findOne({ email, flight_id, seat })
        if (!existingTicket) await ticket.save()
        console.log("ticket", ticket, existingTicket)
        res.status(200).send(ticket)
    }
    catch (err) {
        console.log(err)
        res.status(401)
    }
}

const returnUserTickets = async (req, res) => {
    const email = req.email
    const userTickets = await ticketModel.find({ email })
    console.log("userTickets", userTickets)
    if (userTickets) res.status(200).send(userTickets)
    else res.status(401).json("Tickets not found")
}

module.exports = { addTicketToDatabase, returnUserTickets } 