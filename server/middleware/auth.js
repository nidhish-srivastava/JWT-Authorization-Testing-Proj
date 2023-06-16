const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization) //--> Once the code is setup for middleware,we will start writing the entire logic,first import CustomAPI and jwt
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No Token provided', 401)
    }
    
    //  authHeader =  Bearer sakdfjghfsjkfgbsdjkgbfsjkbdfjks
    //* authHeader.split(' ')=>  Bearer,sakdfjghfsjkfgbsdjkgbfsjkbdfjks  --> We will choose the 2nd element


    const token = authHeader.split(' ')[1]  // it will create array of substrings,we will access the second element of the array


    // First we will copy code from the controller of authorization,then we will keep the luckyNumber code inside the controller
    // const luckyNumber = Math.floor(Math.random() * 100)
    // res.status(200).json({ msg: `Hello ${decoded.username}`, secret: `Your lucky number is ${luckyNumber}` })
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id,username} = decoded // we just destructured decoded object
        req.user = {id,username}
        next()
    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', 401)
    }
}




module.exports = authenticationMiddleware