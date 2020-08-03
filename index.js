const express = require("express")
const userRoute = require("./routes/userRoute")

const app= express()

app.use("/user",userRoute)

const port = 3535
app.listen(port,console.log("now listening on",port))