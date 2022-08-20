const { StatusCodes } = require("http-status-codes");


const authenticateUser = async (req, res, next) => {

    let token;
    const authHeader = req.header.authorization;
    console.log(authHeader)
};

const authUser = async (req, res, next) => {
    if (req.user == null) {
        return res.status(StatusCodes.UNAUTHORIZED).send('not allowed')
    }
}


const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "No user with this email is found" });
        }
        next();
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions,
    authUser
}