function resetAuthCookies(req, res, next) {
    if (req.cookies.storeAuthToken) {
        res.clearCookie('storeAuthToken');
    };

    if (req.cookies.userAuthToken) {
        res.clearCookie('userAuthToken');
    };

    next();
};

export {
    resetAuthCookies
};