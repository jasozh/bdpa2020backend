const ticketModel = require('./schemas/ticket')
const addTicketToDatabase = async (req, res) => {
    console.log("Request? ", req.body)
    const user = req.body.username, flight_id = req.body.flight_id
    if (user === undefined) res.json({ error: "bad input, please have user sent" })
    const ticketDB = new ticketModel({ username, flight_id })
    try {
        const results = await ticketDB.save()
        console.log("ticket", results)
    }
    catch (err) {
        console.log(err)
        res.send("Bad input")
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