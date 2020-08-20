const userModel = require('./schemas/user'), userInformationModel = require("./schemas/userInformation")
const bycrypt = require("bcrypt")

const addUserToDatabase = async (req, res) => {
    // console.log("Request body:", req.body)
    const securityQuestion1 = req.body.securityQuestion1, securityQuestion2 = req.body.securityQuestion2, securityQuestion3 = req.body.securityQuestion3
    const title = req.body.title, firstName = req.body.firstName, middleName = req.body.middleName, lastName = req.body.lastName, suffix = req.body.suffix
    const sex = req.body.sex, birthdate = req.body.birthdate
    const city = req.body.city, state = req.body.state, zip = req.body.zip, country = req.body.country
    const phone = req.body.phone, email = req.body.email, password = req.body.password
    const ffms = req.body.ffms
    try {
        const hashedPassword = await bycrypt.hash(password, 10)
        const userCreds = new userModel({
            email, password: hashedPassword, securityQuestion1, securityQuestion2, securityQuestion3, role: "customer"
        })
        console.log("user creds: ", userCreds)
        const results = await userCreds.save()
        try {
            const userInfo = new userInformationModel({
                ffms, email, title, firstName, middleName, lastName, suffix,
                sex, birthdate,
                city, state, zip, country,
                phone, card: ""
            })
            console.log("user info", userInfo)
            const results = await userInfo.save()
            console.log("saved user")
            res.status(200).send("User Saved")
            return
        } catch (err) {
            console.log(err)
            await userModel.deleteOne({ email })
            if (err.code === 11000) res.status(409).json({ err })
            else res.send("Bad input")
        }
    } catch (err) {
        console.log(err)
        if (err.code === 11000) {
            res.status(409).json({ err })
            return
        }
    }
    res.status(401).send("Bad input")
}

const verifyUserCredentials = async (email, password) => {
    console.log("Credentials:", email, password)
    const user = await findUser(email)
    if (!user) return false
    const userInformation = await findUserInformation(email)
    if (!userInformation) return false
    const validPassword = await bycrypt.compare(password, user.password)
    if (!validPassword) return false
    console.log("valid password", validPassword)
    return user.role
}
const verifyUserSecurityQuestions = async (email, securityQuestion1, securityQuestion2, securityQuestion3) => {
    console.log("Credentials:", email, securityQuestion1, securityQuestion2, securityQuestion3)
    const user = await findUser(email)
    if (!user) return false
    const userInformation = await findUser(email)
    console.log("Real Credentials:", userInformation.email, userInformation.securityQuestion1, userInformation.securityQuestion2, userInformation.securityQuestion3)
    if (!userInformation || userInformation.securityQuestion1 != securityQuestion1 || userInformation.securityQuestion2 != securityQuestion2 || userInformation.securityQuestion3 != securityQuestion3) return false
    console.log("valid security questions")
    return user.role
}
const findUser = async email => {
    const user = await userModel.findOne({ email })
    if (user === null || user === undefined) return false
    console.log("Found user", user)
    return user
}
const findUserInformation = async email => {
    const userInfo = await userInformationModel.findOne({ email })
    if (userInfo === null || userInfo === undefined) return false
    console.log("Found user information", userInfo)
    return userInfo
}
const returnUserInformation = async (req, res) => {
    const userInfo = await findUserInformation(req.email)
    if (userInfo) {
        res.status(200).send(userInfo)
        await userInfo.update({ lastLoginDate: Date.now() })
        await userInfo.update({ lastLoginIp: req.ip })
    }
    else res.status(400).json("User info not found")
}
const updateUserInformation = async (req, res) => {
    console.log(req.email)
    const { email, ...userInfo } = req.body
    console.log(userInfo)
    try {
        await userInformationModel.findOneAndUpdate(req.email, userInfo)
        const newUserInfo = await findUserInformation(req.email)
        console.log("newUserInfo", newUserInfo)
        res.status(200).send(newUserInfo)
    }
    catch (err) {
        console.log(err)
        res.status(400)
    }
}
const findUserRole = async email => {
    const userRole = await userModel.find({ email }, { role: 1, _id: 0 });
    if (userRole === null || userRole === undefined) return false
    console.log("Found user role", userRole)
    return userRole
}
const returnUserRole = async (req, res) => {
    const userRole = await findUserRole(req.email)
    if (userRole) {
        res.status(200).send(userRole)
    }
    else res.status(400).json("User role no found")
}
// Retrieve all users for admin dashboard
const findAllUsers = async email => {
    const users = await userInformationModel.find()
    if (users === null || users === undefined) return false
    console.log("Found users", users)
    return users
}
const returnAllUsers = async (req, res) => {
    const users = await findAllUsers(req.email)
    if (users) {
        res.status(200).send(users)
    }
    else res.status(400).json("Users unable to be retrieved")
}
// Delete user 
const deleteUser = async email => {
    const userExist = await findUser(email)
    if (userExist) {
        console.log('User Exist')
        try {
            console.log('Deleting User:', email)
            const deleteuserInfoResult = await userInformationModel.deleteOne({ email })
            const deleteuserCredResult = await userModel.deleteOne({ email })
            if (deleteuserInfoResult.deletedCount === 1 && deleteuserCredResult.deletedCount === 1) {
                return true
            }
            return false
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log('User does not exist');
        return false;
    }
}
const returnDeletedUser = async (req, res) => {
    console.log('Request email is: ', req.params.email)
    const email = await req.params.email;
    const user = await deleteUser(email)
    if (user) {
        res.status(200).send('User Deleted')
        console.log('User Deleted')
    } else {
        res.status(400).json('User Not Deleted')
        console.log('User Not Deleted')
    }
}
// User Ban 
const changeUserBan = async email => {
    const userBan = await userInformationModel.find({ email }, { isBanned: 1, _id: 0 });
    if (userBan === null || userBan === undefined) return undefined
    const currentState = await userBan[0].isBanned
    await userInformationModel.updateOne({ email }, { $set: {isBanned: !currentState}})
    return true
}
const requestUserBan = async (req, res) => {
    console.log('Requesting Ban')
    console.log(req.params.email)
    await changeUserBan(req.params.email)
}
module.exports = { addUserToDatabase, verifyUserCredentials, verifyUserSecurityQuestions, findUser, returnUserInformation, updateUserInformation, returnUserRole, returnAllUsers, returnDeletedUser, requestUserBan } 
