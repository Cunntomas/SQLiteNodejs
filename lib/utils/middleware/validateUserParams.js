'use strict';

function validateUserParams(req, res, next) {
    if (!req.body.name && !req.body.lastName && !req.body.birthday && !req.body.dni) {
        return res.status(400).json({
            error: 'missing params',
            code: 'missing_params', status: 'error'
        });
    }
    return next();
}

module.exports = validateUserParams;
