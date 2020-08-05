const express = require("express")
const userRoute = require("./routes/userRoute"), ticketRoute = require("./routes/ticketRoute")
const mongoose = require("mongoose")
const cors = require("cors")

const mongoDefaultURL = "mongodb://127.0.0.1:27017/airport"

mongoose.connect(mongoDefaultURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const dbConnection = mongoose.connection
dbConnection.on("error", err => console.error(err))
dbConnection.once("open", () => console.log('Database connected!'))

const app = express()

app.use(cors())
app.use("/user", userRoute)
app.use("/ticket", ticketRoute)

const port = 3535
app.listen(port, console.log("now listening on", port))