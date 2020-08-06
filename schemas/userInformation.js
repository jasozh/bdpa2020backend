const mongoose = require("mongoose")

const userInformationSchema = mongoose.Schema({
    title: { type: String },
    username: { type: String, required: true, unique: true },
    suffix: { type: String },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    sex: { type: String, required: true },
    birthdate: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    lastLoginIp: { type: String },
    lastLoginDate: { type: String },
})

const model = mongoose.model("userInformation", userInformationSchema)

module.exports = model