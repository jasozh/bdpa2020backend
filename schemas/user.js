const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  securityQuestion1: { type: String, required: true },
  securityQuestion2: { type: String, required: true },
  securityQuestion3: { type: String, required: true }
})

const model = mongoose.model("userCredentials", userSchema)

module.exports = model