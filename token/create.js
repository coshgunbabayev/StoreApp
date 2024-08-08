import jwt from 'jsonwebtoken';

function storeVerificationToken(id) {
    return jwt.sign({
        id,
        role: 'store'
    },
        process.env.JWT_SECRET_VERIFICATION, {
        expiresIn: "15m"
    });
};

function loginToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_LOGIN, {
        expiresIn: "30d"
    });
};

export {
    storeVerificationToken,
    loginToken
};