const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const getAllUsers = async(req, res) => {
    const result = await User.find({}).populate('')
    res.json({ result, nbHits: result.length })
}
const getAllUsersRef = (req, res) => {
    User.find({}, function (err, result) {
        if (err) {
            console.log(err)
        }
    })
    res.json({ result, nbHits: result.length })
}

const getUserById = async (req, res) => {
    const { params: { id: userId, } } = req

    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No user with this id" })
        }
        res.status(StatusCodes.OK).json(user)
    } catch (error) {
        console.log(error)
    }
}

const updateUserById = async (req, res) => {

    const { body: { role }, params: { id: userId, } } = req
    try {
        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No user with this id" })
        }

        user.role = role;
        res.status(StatusCodes.OK).json(user)
    } catch (error) {
        console.log(error)
    }
}

const deleteUserById = async (req, res) => {
    const { params: { id: userId, } } = req

    try {
        const user = await User.findByIdAndDelete({ _id: userId })

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No user with this id" })
        }
        res.status(StatusCodes.OK).json(user)

    } catch (error) {
        console.log(error)
    }
}





module.exports = {
    getAllUsers,
    getAllUsersRef,
    getUserById,
    updateUserById,
    deleteUserById,
} 