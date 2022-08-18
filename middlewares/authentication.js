const { StatusCodes } = require("http-status-codes");


const authenticateUser = async (req, res, next) => {

    let token;
    const authHeader = req.header.authorization;
    console.log(authHeader)
};


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
}