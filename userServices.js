const userModel = require('./schemas/user'), userInformationModel = require("./schemas/userInformation")
const bycrypt = require("bcrypt")

const addUserToDatabase = async (req, res) => {
  // console.log("Request body:", req.body)
  const username = req.body.username
  const securityQuestion1 = req.body.securityQuestion1, securityQuestion2 = req.body.securityQuestion2, securityQuestion3 = req.body.securityQuestion3
  const title = req.body.title, firstName = req.body.firstName, middleName = req.body.middleName, lastName = req.body.lastName, suffix = req.body.suffix
  const sex = req.body.sex, birthdate = req.body.birthdate
  const city = req.body.city, state = req.body.state, zip = req.body.zip, country = req.body.country
  const phone = req.body.phone, email = req.body.email, password = req.body.password
  try {
    const hashedPassword = await bycrypt.hash(password, 10)
    const userCreds = new userModel({
      username, password: hashedPassword, securityQuestion1, securityQuestion2, securityQuestion3, role: "customer"
    })
    console.log("user creds: ", userCreds)
    const results = await userCreds.save()
    try {
      const userInfo = new userInformationModel({
        username, title, firstName, middleName, lastName, suffix,
        sex, birthdate,
        city, state, zip, country,
        email, phone
      })
      console.log("user info", userInfo)
      const results = await userInfo.save()
      console.log("saved user")
      res.status(200).send("User Saved")
      return
    } catch (error) {
      console.log('In the catch', error)
      await userModel.deleteOne({ username })
      if (error.code === 11000) res.status(409).json({ error })
      else res.send("Bad input")
      // res.json(error) // todo: don't send this all back
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error })
      return
    }
  }
  res.status(401).send("Bad input")
}

const verifyUserCredentials = async (username, firstName, lastName, password) => {
  console.log("Credentials:", username, firstName, lastName, password)
  const user = await findUser(username)
  if (!user) return false
  const userInformation = await userInformationModel.findOne({ username })
  if (userInformation.firstName != firstName || userInformation.lastName != lastName) return false
  const validPassword = await bycrypt.compare(password, user.password)
  console.log("valid password", validPassword)
  return user.role
}

const findUser = async username => {
  const user = await userModel.findOne({ username })
  if (user === null || user === undefined) return false
  console.log("Found user", user)
  return user
}

module.exports = { addUserToDatabase, verifyUserCredentials, findUser } 