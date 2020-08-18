const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema({
    username: { type: String, require: true },
    flight_id: { type: String, required: true }
})

const model = mongoose.model("ticket", ticketSchema)

module.exports = model