function account(req, res) {
    res.status(200).json({
        role: req.userRole
    });
};

export {
    account
};