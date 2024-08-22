import bcrypt from 'bcryptjs';

import Store from '../models/store.js';
import User from '../models/user.js';

import {
    verificationToken
} from '../tools/token.js';

import {
    sendEmailForVerificationPage,
    sendEmailForVerificationCode
} from '../smtp/send.js';

async function createStore(req, res) {
    try {
        const { name, email, password } = req.body;

        const store = await Store.create({
            name,
            email,
            password
        });

        const hashedPassword = await bcrypt.hash(store.password, 10);

        await Store.findByIdAndUpdate(
            store._id,
            { password: hashedPassword },
            { new: true }
        );

        const token = verificationToken(store._id, 'store');

        await sendEmailForVerificationPage(store.email, token, 'store');
        await sendEmailForVerificationCode(store.email, store.verification.code, 'store');

        res.status(201).json({
            token
        });
    } catch (err) {
        let errors = new Object();

        if (err.name === "ValidationError") {
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
        };

        if (err.name === "MongoServerError" && err.code === 11000) {
            if (err.keyPattern.email) {
                errors.email = 'Email is used, try other email';
            };
        };

        res.status(400).json({
            errors
        });
    };
};

async function createUser(req, res) {
    try {
        const { name, surname, username, email, password } = req.body;

        const user = await User.create({
            name,
            surname,
            username,
            email,
            password
        });

        const hashedPassword = await bcrypt.hash(user.password, 10);

        await User.findByIdAndUpdate(
            user._id,
            { password: hashedPassword },
            { new: true }
        );

        const token = verificationToken(user._id, 'user');

        await sendEmailForVerificationPage(user.email, token, 'user');
        await sendEmailForVerificationCode(user.email, user.verification.code, 'user');

        res.status(201).json({
            token
        });
    } catch (err) {
        let errors = new Object();

        if (err.name === "ValidationError") {
            Object.keys(err.errors).forEach(key => {
                errors[key] = err.errors[key].message;
            });
        };

        if (err.name === "MongoServerError" && err.code === 11000) {
            if (err.keyPattern.username) {
                errors.username = 'Username is used, try other username';
            };

            if (err.keyPattern.email) {
                errors.email = 'Email is used, try other email';
            };
        };

        res.status(400).json({
            errors
        });
    };
};

export {
    createStore,
    createUser
};