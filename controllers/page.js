function getStoreSignupPage(req, res) {
    res.status(200).render('account/signup/store');
};

function getUserSignupPage(req, res) {
    res.status(200).render('account/signup/user');
};

function getVerificationCodePage(req, res) {
    res.status(200).render('account/verification/code', {
        userRole: req.url.split('/')[3]
    });
};

function getVerificationEmailPage(req, res) {
    res.status(200).render('account/verification/email');
};

function getStoreLoginPage(req, res) {
    res.status(200).render('account/login/store');
};

function getUserLoginPage(req, res) {
    res.status(200).render('account/login/user');
};

export {
    getStoreSignupPage,
    getUserSignupPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getStoreLoginPage,
    getUserLoginPage
};