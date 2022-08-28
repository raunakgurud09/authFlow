const { signedCookies } = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");


const authenticateUser = async (req, res, next) => {

    let token;
    const authHeader = req.header.authorization;
    console.log(authHeader)
};

const authUser = async (req, res, next) => {
    console.log(req.Cookie)
    next();
    // const { accessToken, refreshToken } = req.Cookie;
    // console.log(accessToken, refreshToken)
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