import bcrypt from 'bcryptjs';

import Store from '../models/store.js';
import User from '../models/user.js';

import {
    storeLoginToken,
    userLoginToken
} from '../tools/token.js';

async function loginStore(req, res) {
    const { email, password } = req.body;
    let errors = new Object();

    if (!email || !password) {
        if (!email) {
            errors.email = 'Please enter an email address';
        };

        if (!password) {
            errors.password = 'Please enter a password';
        };

        return res.status(400).json({
            errors
        });
    };

    let store;
    try {
        store = await Store.findOne({ email });
    } catch (err) {
        return res.status(400).json({
            errors: {
                email: 'Email is incorrect'
            }
        });
    };

    if (!store) {
        return res.status(400).json({
            errors: {
                email: 'Email is incorrect'
            }
        });
    };

    if (!await bcrypt.compare(password, store.password)) {
        return res.status(400).json({
            errors: {
                password: 'Password is incorrect'
            }
        });
    };

    const token = storeLoginToken(store._id);

    res.cookie('storeAuthToken', token);
    res.status(200).json({});
};

async function loginUser(req, res) {
    const { username, password } = req.body;
    let errors = new Object();

    if (!username || !password) {
        if (!username) {
            errors.username = 'Please enter a username';
        };

        if (!password) {
            errors.password = 'Please enter a password';
        };

        return res.status(400).json({
            errors
        });
    };

    let user;
    try {
        user = await User.findOne({ username });
    } catch (err) {
        return res.status(400).json({
            errors: {
                username: 'Username is incorrect'
            }
        });
    };

    if (!user) {
        return res.status(400).json({
            errors: {
                username: 'Username is incorrect'
            }
        });
    };

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({
            errors: {
                password: 'Password is incorrect'
            }
        });
    };

    const token = userLoginToken(user._id);

    res.cookie('userAuthToken', token);
    res.status(200).json({});
};

export {
    loginStore,
    loginUser
};