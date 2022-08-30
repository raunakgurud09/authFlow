const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const getAllUsers = (req, res) => {

    User.find({}, function (err, result) {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })

}

const getUserById = async (req, res) => {
    const { params: { id: userId, } } = req
    const user = await User.findOne({ _id: userId })
    res.status(StatusCodes.OK).json(user)
}



module.exports = {
    getAllUsers,
    getUserById
} 