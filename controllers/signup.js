import bcrypt from 'bcryptjs';

import Store from '../models/store.js';

import {
    storeVerificationToken
} from '../token/create.js';

import {
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

        await sendEmailForVerificationCode(store.email, store.verification.code, 'store');

        res.status(201).json({
            token: storeVerificationToken(store._id)
        });
    } catch (err) {
        let errors = new Object();

        console.log(err);

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

export {
    createStore
};