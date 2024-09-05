import jwt from 'jsonwebtoken';
import validator from 'validator';

import User from '../models/user.js';
import Store from '../models/store.js';

import {
    verificationToken
} from '../tools/token.js';

import {
    sendEmailForVerificationPage
} from '../smtp/send.js';

const models = {
    store: Store,
    user: User
};

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
                code: 'Please enter a verification code'
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

async function verificationEmail(req, res) {
    const { role } = req.params;
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            errors: {
                email: 'Please enter an email address'
            }
        });
    };

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            errors: {
                email: 'Please enter a valid email address'
            }
        });
    };

    const model = models[role];

    const account = await model.findOne({ email });

    if (!account) {
        return res.status(404).json({
            errors: {
                email: 'Account not found with this email address'
            }
        });
    };

    if (account.verification.status) {
        return res.status(400).json({
            message: 'UserVerified'
        });
    };

    const token = verificationToken(account._id, role);

    await sendEmailForVerificationPage(account.email, token, role); 

    res.status(200).json({});
};

export {
    verificationCode,
    verificationEmail
};