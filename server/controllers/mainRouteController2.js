/*check username and password in post(login) request
if exist,create JWT token
Send it to the front-end
Setup authentication so only the request with JWT can access the dashboard
*/
const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    // step 1 from comments--> checking if username and password is there or not
    // Since it is a post request,our data will be in req.body

    // if User  giving empty input
    // We have three options for validation--> 
    //1.Mongoose Schema  , 2.Joi , 3.Check in the controller 

    // Check this too using ThunderClient
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }
    // NOTE --> AFTER CREATING THIS IF BLOCK FOR ERROR HANDLING, WE WILL NOW CREATE JSON WEB TOKENS
    // JWT has three parts ---> HEADER , PAYLOAD , SIGNATURE

    // Dont pass confidential info,like password inside the payload

    // Normally we pass the id from the db but since we dont have connection with the db,we will pass a dummmy id

    // Keep the payload simple for better user experience(coz bigger the payload,more data u r sending,this might lag the user if slow internet connection)

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    
    res.status(200).json({ msg: "user created", token })


    // first we will check these codes from ThunderClient,we will not use this once we start using JWT
    /*console.log(username,password)  
    res.send('Fake Login/Signup/Register Route')
    */
}

const dashboard = async (req, res) => {
    // We will set the header first in ThunderClient,then check it here
    // console.log(req.headers)
    // Now lets write the exact logic
    const authHeader = req.headers.authorization  // IN THe front-end,we will set the header for authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No Token provided', 401)  // 400 for bad request and 401 for unauthorised
    }
    // Now we will just check the token
    const token = authHeader.split(' ')[1]  // Our token is--> Bearer ${token},we need token,so we will use split method and access the 2nd element
    // console.log(token)

    // Now comes the stage of verification(we got back the token from front-end,now we neeed to verify wether it is valid or not)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded) //After checking the log,we will now move the luckyNumber shit inside this try block and do our dynamic stuff

        const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({ msg: `Hello ${decoded.username}`, secret: `Your lucky number is ${luckyNumber}` })
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }


    // const luckyNumber = Math.floor(Math.random()*100)
    // res.status(200).json({msg:`Hello bitch`,secret:`Your lucky number is ${luckyNumber}`})
}

module.exports = { login, dashboard }