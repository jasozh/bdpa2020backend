const { verifyUserCredentials } = require("../userServices")
const userAuth = async (req, res, next) => {
    const requestHeader = req.headers.authorization
    if (requestHeader === undefined) res.status(401).json({ error: "User credientials not supplied" })
    const [type, payload] = requestHeader.split(" ")
    console.log("PAYLOAD?", payload)
    if (type === 'Basic') {
        const credentials = Buffer.from(payload, 'base64').toString('ASCII')
        const [username, firstName, lastName, password] = credentials.split(':')
        const validUserCredentials = await verifyUserCredentials(username, firstName, lastName, password)
        console.log('valid user', validUserCredentials)
        if (validUserCredentials) {
            req.username = username
            req.role = validUserCredentials
            next()
            return
        }
        res.status(401).json({ error: "Bad Credentials" })
        return
    }
    res.status(401).json({ error: "Wrong userpass method" })
}

module.exports = userAuth