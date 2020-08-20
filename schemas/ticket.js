const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema({
    email: { type: String, require: true },
    flight_id: { type: String, required: true },
    seat: { type: Number, required: true }
})

const model = mongoose.model("ticket", ticketSchema)

module.exports = model