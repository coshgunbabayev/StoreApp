function getSignupPage(req, res) {
    res.status(200).render(`account/signup/${req.params.role}`);
};

function getVerificationCodePage(req, res) {
    res.status(200).render('account/verification/code');
};

function getVerificationEmailPage(req, res) {
    res.status(200).render('account/verification/email', {
        userRole: req.params.role
    });
};

function getLoginPage(req, res) {
    res.status(200).render(`account/login/${req.params.role}`);
};

function getIndexPage(req, res) {
    res.status(200).render('pages/index');
};

function getDashboardPage(req, res) {
    res.status(200).render('pages/store/dashboard');
};

export {
    getSignupPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getLoginPage,
    getIndexPage,
    getDashboardPage
};