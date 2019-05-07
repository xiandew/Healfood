let {body, validationResult} = require('express-validator/check');
let {sanitizeBody} = require('express-validator/filter');

let userInputRules = [
    body('username')
        .not().isEmpty().withMessage('Name cannot be blank'),
    body('email')
        .not().isEmpty().withMessage('Email cannot be blank')
        .isEmail().withMessage('Email is not valid'),
    body('password')
        .not().isEmpty().withMessage('Password cannot be blank')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    body('pwdConfirm')
        .custom((value, {req}) => value === req.body.password).withMessage('Passwords do not match'),
    sanitizeBody('email')
        .normalizeEmail({gmail_remove_dots: true, gmail_convert_googlemaildotcom: true})
];

let rstrntInputRules = [
    body('name')
        .not().isEmpty().withMessage('Restaurant name cannot be blank'),
    body('address')
        .not().isEmpty().withMessage('Restaurant address cannot be blank')
];

let validate = function (req, res, next) {
    // Check for validation errors
    let errors = validationResult(req)
        .array({onlyFirstError: true})
        .filter(e => e.value !== undefined);
    if (errors.length) {
        req.session.errors = errors;
        req.session.body = req.body;
        req.session.save();
        return res.redirect(req.originalUrl);
    }
    next();
};

module.exports.validateUserInput = [userInputRules, validate];
module.exports.validateRstrntInput = [rstrntInputRules, validate];