import jwt from 'jsonwebtoken';

import Store from '../models/store.js';
import User from '../models/user.js';

const models = {
    store: Store,
    user: User
};

const secrets = {
    store: process.env.JWT_SECRET_STORE_LOGIN,
    user: process.env.JWT_SECRET_USER_LOGIN
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

        if (!token) {
            return res.status(400).json({
                message: 'AccountNotAuthenticated'
            });
        };
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
        account = await models[role].findById(decoded.id);
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

};

async function storeAuthenticateForApi(req, res, next) {

};

async function userAuthenticateForPage(req, res, next) {

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

// async function authenticateForPage(req, res, next) {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.redirect('/account');
//     };

//     let decoded;
//     try {
//         decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//         return res.redirect('/account');
//     };

//     let user;
//     try {
//         user = await User.findById(decoded.userId);
//     } catch (err) {
//         return res.redirect('/account');
//     }

//     if (!user) {
//         return res.redirect('/account');
//     };

//     res.locals.user = user;
//     next();
// };

// export {
//     authenticateForApi,
//     authenticateForPage,
// };