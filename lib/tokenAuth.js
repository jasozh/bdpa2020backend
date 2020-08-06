const jsonWebToken = require('jsonwebtoken')
const { findUser } = require('../userServices')

const tokenSignature = "secretTokenSignature"
const tokenAuth = async (req, res, next) => {
    const requestHeader = req.headers.authorization
    if (requestHeader === undefined || requestHeader === null) res.status(401).json({ error: "Unauthorized" })
    const [type, payload] = requestHeader.split(" ")
    if (type === "Bearer") {
        try {
            const verification = jsonWebToken.verify(payload, tokenSignature)
            console.log("Verification: ", verification)
            const user = await findUser(verification.username)
            if (user) {
                req.username = verification.username
                next()
                return
            }
            res.status(401).json({ error: "Unauthorized. Bad Token!" })
            return
        } catch (error) {
            res.status(401).json({ error: "Bad Credentials" })
            return
        }
    }
    res.status(401).json({ error: "Unauthorized. Bad Token!" })
}
module.exports = tokenAuth