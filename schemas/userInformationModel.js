const mongoose = require("mongoose")

const userInformationSchema = mongoose.Schema({
    Title: {
      type: String,
    },
    userName: {
      type: String,
      required: true, 
      unique: true
    },
    suffix: {
        type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true, 
    },
    sex: {
      type: String,
      required: true, 
    },
    dateOfBirth: {
      type: String,
      required: true, 
    },
    City: {
        type: String,
    },
    State: {
        type: String,
    },
    Zip: {
        type: String,
    },
    Country: {
        type: String,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Phone: {
        type: String,
        unique: true
    }
  })
  
  const model = mongoose.model("userInformation", userInformationSchema)
  
  module.exports = model