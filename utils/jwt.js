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

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
    const accessTokenJWT = createJWT({ payload: { user } })
    const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })

    const oneDayExpire = 1000 * 60 * 60 * 24; //24 hours
    const longExpire = 1000 * 60 * 60 * 24 * 30; //30 days

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // signed: true,
        expires: new Date(Date.now() + oneDayExpire)
    });

    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        // signed: true,
        expires: new Date(Date.now() + longExpire)
    });
}



module.exports = {
    createJWT,
    isTokenValid,
    createTokenUser,
    attachCookiesToResponse,
}