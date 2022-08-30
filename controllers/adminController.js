const User = require("../models/User");

const getAllUsers = (req, res) => {

    User.find({}, function (err, result) {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })

}

const getUserById = (req, res) => {
    console.log('getUserById');
    res.send("getUserById")
}



module.exports = {
    getAllUsers,
    getUserById
} 