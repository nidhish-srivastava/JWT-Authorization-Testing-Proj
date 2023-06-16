const express = require('express')
const router = express.Router()
const {login,dashboard} = require('../controllers/mainRouteController')

// WE CREATED this middleware,coz we cant just keep copying the JWT code in every route

const authenticationMiddleware = require('../middleware/auth')

// Using our middlewaare in the dashboard route
router.route('/dashboard').get(authenticationMiddleware,dashboard)
router.route('/login').post(login)

module.exports = router