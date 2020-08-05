const userModel = require('./schemas/user')
const bycrypt = require("bcrypt")
const userInformationModal = require("./schemas/userInformation")

const addUserToDatabase = async (req, res) => {
  console.log("Request body:", req.body)
  const userName = req.body.userName
  try {
    const password = req.body.password
    const securityQuestionOne = req.body.securityQuestionOne
    const securityQuestionTwo = req.body.securityQuestionTwo
    const securityQuestionThree = req.body.securityQuestionThree
 

    console.log(password)
    const hashedPassword = await bycrypt.hash(password, 10)

    const userCreds = new userModel({
      userName,
      password: hashedPassword,
      securityQuestionOne,
      securityQuestionTwo,
      securityQuestionThree
    })
    console.log(`user creds? : `, userCreds)
    const results = await userCreds.save()

  }catch(error){
    if (error.code === 11000) {
      res.send('Username already taken')
    }
    res.send("Bad input")
  }

  try{
    const title = req.body.title
    const suffix = req.body.suffix
    const firstName = req.body.firstName
    const middleName = req.body.middleName
    const lastName = req.body.lastName
    const sex = req.body.sex
    const dateOfBirth = req.body.dateOfBirth
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const country = req.body.country
    const email = req.body.email
    const phone = req.body.phone
    const userInfo = new userInformationModal({
      title,
      userName,
      suffix,
      firstName,
      middleName,
      lastName,
      sex,
      dateOfBirth,
      city,
      state,
      zip,
      country,
      email,
      phone
    })
    console.log(`user info`,userInformationModal)

    const results = await userInformationModal.save()
    res.json(results)
  } catch(error) {
    console.log('In the catch', error)
    res.json(error) // todo: don't send this all back
    
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