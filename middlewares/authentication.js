const { signedCookies } = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
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
            return next();
        }

        const payload = isTokenValid(refreshToken);

        const existingToken = User.findOne({
            user: payload.user.userId,
            refreshToken: payload.refreshToken,
        })

        if (!existingToken) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication Invalid" })
        }
        attachCookiesToResponse({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.users
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
                .json({ message: "Unauthorized to access this route" });
        }
        next();
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions,
    authUser
}