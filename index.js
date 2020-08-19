const express = require("express"), mongoose = require("mongoose"), cors = require("cors")
const userRoute = require("./routes/userRoute"), tokenRoute = require("./routes/tokenRoute"), ticketRoute = require("./routes/ticketRoute")
const userAuth = require("./lib/userAuth"), tokenAuth = require("./lib/tokenAuth")

const mongoDefaultURL = "mongodb://127.0.0.1:27017/airport"

mongoose.connect(mongoDefaultURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  useCreateIndex: true
})
mongoose.set('useFindAndModify', false);
const dbConnection = mongoose.connection
dbConnection.on("error", err => console.error(err))
dbConnection.once("open", () => console.log('Database connected!'))

const app = express()

app.use(cors())
app.use("/user", userRoute)
app.use("/token", userAuth, tokenRoute)
app.use("/ticket", tokenAuth, ticketRoute)

const port = 3535
app.listen(port, console.log("now listening on", port))