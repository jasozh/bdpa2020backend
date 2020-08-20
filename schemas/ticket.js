const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema({
    email: { type: String, require: true },
    flight_id: { type: String, required: true },
    seatType: { type: String, required: true },
    seatNum: { type: Number, required: true }
})

const model = mongoose.model("ticket", ticketSchema)

module.exports = model