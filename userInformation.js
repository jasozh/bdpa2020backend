const userModel = require('./schemas/user')
const bycrypt = require("bcrypt")
const userInformationModal = require("./schemas/userInfo")

const addUserToDatabase = async (req, res) => {
  // console.log("Request body:", req.body)
  const username = req.body.firstName + ":" + req.body.lastName
  const securityQuestion1 = req.body.securityQuestion1, securityQuestion2 = req.body.securityQuestion2, securityQuestion3 = req.body.securityQuestion3
  const title = req.body.title, firstName = req.body.firstName, middleName = req.body.middleName, lastName = req.body.lastName, suffix = req.body.suffix
  const sex = req.body.sex, birthdate = req.body.birthdate
  const city = req.body.city, state = req.body.state, zip = req.body.zip, country = req.body.country
  const phone = req.body.phone, email = req.body.email, password = req.body.password
  try {
    const hashedPassword = await bycrypt.hash(password, 10)
    const userCreds = new userModel({
      username, password: hashedPassword, securityQuestion1, securityQuestion2, securityQuestion3
    })
    console.log("user creds: ", userCreds)
    const results = await userCreds.save()
    try {
      const userInfo = new userInformationModal({
        username, title, firstName, middleName, lastName, suffix,
        sex, birthdate,
        city, state, zip, country,
        email, phone
      })
      console.log("user info", userInfo)
      const results = await userInfo.save()
      console.log("saved user info")
      return true
    } catch (error) {
      console.log('In the catch', error)
      res.json(error) // todo: don't send this all back
      return false
    }
  } catch (error) {
    if (error.code === 11000) console.log("username taken")
    else res.send("Bad input")
    return false
  }
}

const checkUserCredentials = async (username, password) => {
  console.log("username? ", username, password)

  console.log("password1! length", "password1!".length)
  console.log("password1! length", password.length)

  const results = await userModel.findOne({
    username
  })

  if (results === null || results === undefined) {
    return false
  }

  console.log("Results", results)

  const comparisonBool = await bycrypt.compare(password, results.password)

  console.log("comparison?", comparisonBool)
  return comparisonBool
}

const checkUserExists = async username => {
  const results = await userModel.findOne({
    username
  })

  if (results === null || results === undefined) {
    return false
  }

  console.log("Results", results)

  return true

}

module.exports = { addUserToDatabase, checkUserCredentials, checkUserExists } 