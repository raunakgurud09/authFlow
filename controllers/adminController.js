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

    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "No user with this id" })
    }
    res.status(StatusCodes.OK).json(user)
}

const updateUserById = async (req, res) => {

    const { body: { role }, params: { id: userId, } } = req
    const user = await User.findOne({ _id: userId })

    res.status(StatusCodes.OK).json(user)
}

const deleteUserById = async (req, res) => {
    const { params: { id: userId, } } = req
    const user = await User.findByIdAndDelete({ _id: userId })

    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "No user with this id" })
    }
    res.status(StatusCodes.OK).json(user)
}





module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} 