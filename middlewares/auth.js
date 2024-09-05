import jwt from 'jsonwebtoken';

import Store from '../models/store.js';
import User from '../models/user.js';

const models = {
    store: Store,
    user: User
};

async function commonAuthenticateForPage(req, res, next) {

};

async function commonAuthenticateForApi(req, res, next) {
    let token, role;

    const secrets = {
        store: process.env.JWT_SECRET_STORE_LOGIN,
        user: process.env.JWT_SECRET_USER_LOGIN
    };

    if (req.cookies.storeAuthToken && req.cookies.userAuthToken) {
        res.clearCookie('storeAuthToken');
        res.clearCookie('userAuthToken');

        return res.status(400).json({
            message: 'AccountNotAuthenticated'
        });
    } else if (req.cookies.storeAuthToken) {
        token = req.cookies.storeAuthToken;
        role = 'store';
    } else if (req.cookies.userAuthToken) {
        token = req.cookies.userAuthToken;
        role = 'user';
    } else {
        return res.status(400).json({
            message: 'AccountNotAuthenticated'
        });
    };

    let decoded;
    try {
        decoded = jwt.verify(token, secrets[role]);
    } catch (err) {
        return res.status(400).json({
            message: 'AccountNotAuthenticated'
        });
    };

    let account;
    try {
        account = await models[role].findOne({
            _id: decoded.id,
            'verification.status': true
        });
    } catch (err) {
        return res.status(400).json({
            message: 'AccountNotAuthenticated'
        });
    };

    if (!account) {
        return res.status(400).json({
            message: 'AccountNotAuthenticated'
        });
    };

    req.userRole = role;
    req.user = account;
    next();
};

async function storeAuthenticateForPage(req, res, next) {
    const storeAuthToken = req.cookies.storeAuthToken;

    if (!storeAuthToken) {
        return res.redirect('/login/store');
    };

    let decoded;
    try {
        decoded = jwt.verify(storeAuthToken, process.env.JWT_SECRET_STORE_LOGIN);
    } catch (err) {
        return res.redirect('/login/store');
    };

    let store;
    try {
        store = await Store.findOne({
            _id: decoded.id,
            'verification.status': true
        });;
    } catch (err) {
        return res.redirect('/login/store');
    };

    if (!store) {
        return res.redirect('/login/store');
    };

    next();
};

async function storeAuthenticateForApi(req, res, next) {

};

async function userAuthenticateForPage(req, res, next) {
    const userAuthToken = req.cookies.userAuthToken;

    if (!userAuthToken) {
        return res.redirect('/login/user');
    };

    let decoded;
    try {
        decoded = jwt.verify(userAuthToken, process.env.JWT_SECRET_USER_LOGIN);
    } catch (err) {
        return res.redirect('/login/user');
    };

    let user;
    try {
        user = await User.findOne({
            _id: decoded.id,
            'verification.status': true
        });
    } catch (err) {
        return res.redirect('/login/user');
    };

    if (!user) {
        return res.redirect('/login/user');
    };

    next();
};

async function userAuthenticateForApi(req, res, next) {

};

export {
    commonAuthenticateForPage,
    commonAuthenticateForApi,
    storeAuthenticateForPage,
    storeAuthenticateForApi,
    userAuthenticateForPage,
    userAuthenticateForApi,
};