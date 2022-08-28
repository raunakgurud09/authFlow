const { signedCookies } = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const { isTokenValid, attachCookiesToResponse } = require("../utils/jwt");


const authenticateUser = async (req, res, next) => {

    let token;
    const authHeader = req.header.authorization;
    console.log(authHeader)
};

const authUser = async (req, res, next) => {
    // console.log(req.cookies.accessToken)
    const { refreshToken, accessToken } = req.cookies;

    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken)
            req.user = payload.user
            next();
        }

        const payload = isTokenValid(refreshToken);


        attachCookiesToResponse({req,user:payload.user,refreshToken})

        req.user = payload.user
        next();

    } catch (error) {
        console.log(error)
    }

    next();
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