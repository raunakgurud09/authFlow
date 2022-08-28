const jwt = require("jsonwebtoken")

const createTokenUser = (user) => {
    return { name: user.name, userId: user._id, role: user.role }
}

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return token;
}

const isTokenValid = (token) => {
    jwt.verify(token, process.env.JWT_SECRET)
}

const attachCookiesToResponse = ({ req, user, refreshToken }) => {
    const accessTokenJWT = createJWT({ payload: { user } })
    const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })
}



module.exports = {
    createJWT,
    isTokenValid,
    createTokenUser
}