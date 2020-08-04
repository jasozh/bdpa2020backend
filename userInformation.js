const userModel = require('./schemas/user')
const bycrypt = require("bcrypt")

const addUserToDatabase = async (req, res) => {
  console.log("Request body:", req.body)
  try {
    const userName = req.body.userName
    const password = req.body.password
    console.log(password)
    const hashedPassword = await bycrypt.hash(password, 10)

    const userCreds = new userModel({
      userName,
      password: hashedPassword
    })

    console.log(`user creds? : `, userCreds)

    const results = await userCreds.save()

    res.json(results)
  } catch(error) {
    console.log('In the catch', error)
    if (error.code === 11000) {
      res.send('Username already taken')
    }
  }
}


const checkUserCredentials = async (userName, password) => {
  console.log("Username? ", userName, password)

  console.log("password1! length", "password1!".length)
  console.log("password1! length", password.length)

  const results = await userModel.findOne({
    userName
  })

  if (results === null || results === undefined ) {
    return false
  }

  console.log("Results", results)

  const comparisonBool = await bycrypt.compare(password, results.password)

  console.log("comparison?", comparisonBool)
  return comparisonBool  
}

const checkUserExists = async userName => {
  const results = await userModel.findOne({
    userName
  })

  if (results === null || results === undefined) {
    return false
  }

  console.log("Results", results)

  return true

}

module.exports = { 
  addUserToDatabase,
  checkUserCredentials,
  checkUserExists
} 