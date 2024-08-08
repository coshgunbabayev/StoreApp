function getSignupPage(req, res) {
    res.status(200).render(`account/signup/${req.params.role}`);
};

function getVerificationCodePage(req, res) {
    res.status(200).render('account/verification/code', {
        userRole: req.params.role
    });
};

function getVerificationEmailPage(req, res) {
    res.status(200).render('account/verification/email', {
        userRole: req.params.role
    });
};

function getLoginPage(req, res) {
    res.status(200).render(`account/login/${req.params.role}`);
};

export {
    getSignupPage,
    getVerificationCodePage,
    getVerificationEmailPage,
    getLoginPage,
};