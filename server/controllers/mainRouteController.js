// This file contains the code,the prev one contains code as well the detail explaination

const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400)
    }
    
    const id = Math.random().toString()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: "user created", token })
}

//This router logic aint that imp here to write, we will write it on front end,the logic here is jsut for testing

const dashboard = async (req, res) => {  
    // Instead of looking for decoded,i will look for user
    console.log(req.user)  //* iske andr verfied username aur id hoga isliye
// Keeeping the lucky number logic and cutting the rest and pasting it in our middleware
    res.status(200).json({ msg: `Hello ${req.user.username}` })
}




module.exports = { login, dashboard }
