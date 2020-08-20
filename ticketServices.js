const ticketModel = require('./schemas/ticket')
const addTicketToDatabase = async (req, res) => {
    console.log("Ticket Request", req.body)
    const { email, flight_id, seatType, seatNum } = req.body
    try {
        const existingTickets = await ticketModel.find({ flight_id, seatType })
        const takenseatNums = existingTickets.map(ticket => ticket.seatNum)
        console.log(takenseatNums)
        const ticket = new ticketModel({ email, flight_id, seatType, seatNum })
        const existingTicket = await ticketModel.findOne({ email, flight_id, seatType, seatNum })
        console.log("ticket", ticket, existingTicket)
        if (!existingTicket) {
            await ticket.save()
            res.status(200).send(ticket)
        } else res.status(400).json("seatNum taken")
    }
    catch (err) {
        console.log(err)
        res.status(401)
    }
}

const deleteTicketFromDatabase = async (req, res) => {
    console.log("Ticket Deletion", req.body)
    const email = req.body.email, flight_id = req.body.flight_id, seat = req.body.seat
    try {
        const deleteTicket = await ticketModel.deleteOne({ flight_id: flight_id })
        console.log("ticket", existingTicket)
        
        return true
}
    catch (err) {
        console.log(err)
        res.status(401)
    }
}
// const deleteUser = async email => {
//     const userExist = await findUser(email)
//     if (userExist) {
//         console.log('User Exist')
//         try {
//             console.log('Deleting User:', email)
//             const deleteuserInfoResult = await userInformationModel.deleteOne({ email })
//             const deleteuserCredResult = await userModel.deleteOne({ email })
//             if (deleteuserInfoResult.deletedCount === 1 && deleteuserCredResult.deletedCount === 1) {
//                 return true
//             }
//             return false
//         } catch (e) {
//             console.log(e);
//         }
//     } else {
//         console.log('User does not exist');
//         return false;
//     }
// }


const returnUserTickets = async (req, res) => {
    const email = req.email
    const userTickets = await ticketModel.find({ email })
    console.log("userTickets", userTickets)
    if (userTickets) res.status(200).send(userTickets)
    else res.status(401).json("Tickets not found")
}

module.exports = { addTicketToDatabase, returnUserTickets, deleteTicketFromDatabase } 