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

function loginToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_LOGIN, {
        expiresIn: "30d"
    });
};

export {
    verificationToken,
    loginToken
};