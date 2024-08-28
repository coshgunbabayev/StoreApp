import jwt from 'jsonwebtoken';

function verificationToken(id, role) {
    return jwt.sign({
        id,
        role
    },
        process.env.JWT_SECRET_VERIFICATION, {
        expiresIn: "15m"
    });
};

function storeLoginToken(id) {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET_STORE_LOGIN, {
        expiresIn: "30d"
    });
};

function userLoginToken(id) {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET_USER_LOGIN, {
        expiresIn: "30d"
    });
};

export {
    verificationToken,
    storeLoginToken,
    userLoginToken
};