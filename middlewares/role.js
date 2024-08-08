const roles = ['user', 'store'];

function pageRole(req, res, next) {
    if (!roles.includes(req.params.role)){
        return res.status(404).send();
    };

    next();
};

export {
    pageRole
};