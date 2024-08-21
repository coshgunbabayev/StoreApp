import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Store from '../models/store.js';

async function verificationCode(req, res) {
    const { role, token } = req.params;
    const { code } = req.body;

    if (!token) {
        return res.status(400).json({
            message: 'TokenError'
        });
    };

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_VERIFICATION);
    } catch (err) {
        return res.status(400).json({
            message: 'TokenError'
        });
    };

    if (decoded.role !== role) {
        return res.status(400).json({
            message: 'TokenError'
        });
    };

    const models = {
        user: User,
        store: Store
    };
    const model = models[role];

    const account = await model.findById(decoded.id);

    if (!account) {
        return res.status(400).json({
            message: 'TokenError'
        });
    };

    if (account.verification.status) {
        return res.status(400).json({
            message: 'UserVerified'
        });
    };

    if (!code) {
        return res.status(400).json({
            errors: {
                code: 'Verification code is required'
            }
        });
    };

    if (account.verification.code !== code) {
        return res.status(400).json({
            errors: {
                code: 'Verification code is incorrect'
            }
        });
    };

    account.verification.status = true;
    account.verification.code = null;
    await account.save();

    res.status(200).json({});
};

export {
    verificationCode
};