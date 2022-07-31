const express = require('express')
const Router = express.Router();

const {
    register,
    login,
    logout
} = require('../controllers/authController')

Router.post('/register',register)
Router.post('/login',login)
Router.delete('/logout',logout)

module.exports = Router;