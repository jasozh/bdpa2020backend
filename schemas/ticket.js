const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema({
    user: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true
    },
    flight_id: {
        type: String,
        required: true
    }
})

const model = mongoose.model("ticket", ticketSchema)

module.exports = model