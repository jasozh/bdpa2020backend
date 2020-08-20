const mongoose = require("mongoose")

const userInformationSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    title: { type: String },
    suffix: { type: String },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    sex: { type: String, required: true },
    birthdate: { type: Date, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String },
    lastLoginIp: { type: String },
    lastLoginDate: { type: Date },
    card: { type: String }
})

const model = mongoose.model("userInformation", userInformationSchema)

module.exports = model