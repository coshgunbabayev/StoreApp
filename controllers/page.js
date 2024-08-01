function getStoreSignupPage(req, res) {
    res.status(200).render('account/store/signup.ejs');
};

function getStoreLoginPage(req, res) {
    res.status(200).render('account/store/login.ejs');
};

function getUserSignupPage(req, res) {
    res.status(200).render('account/user/signup.ejs');
};

function getUserLoginPage(req, res) {
    res.status(200).render('account/user/login.ejs');
};

export {
    getStoreSignupPage,
    getStoreLoginPage,
    getUserSignupPage,
    getUserLoginPage
};