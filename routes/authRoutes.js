const Router = require('express').Router();
// const Router = express

const {
    register,
    login,
    logout
} = require('../controllers/authController')

Router.post('/register',register)
Router.post('/login',login)
Router.delete('/logout',logout)

module.exports = Router;