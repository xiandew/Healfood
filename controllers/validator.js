let {body, validationResult} = require('express-validator/check');
let {sanitizeBody} = require('express-validator/filter');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
        .custom((value, {req}) => {
            let xmlhttp = new XMLHttpRequest();
            let url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + value;

            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let resultArr = JSON.parse(this.responseText);
                    if (resultArr.length > 0) {
                        req.body.coord = JSON.stringify([resultArr[0].lat, resultArr[0].lon]);
                    } else {
                        return promise.reject();
                    }
                }
            };
            xmlhttp.open("GET", url, false);
            xmlhttp.send();
            return true;
        }).withMessage("Cannot find any matching address on the map. Make sure it well-formatted please")
];

// Tile, rating cannot be blank
let reviewInputRules = [
    body('title').not().isEmpty().withMessage("Review title cannot be blank")
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

module.exports = {
    validateUserInput: [userInputRules, validate],
    validateRstrntInput: [rstrntInputRules, validate],
    validateReviewInput: [reviewInputRules, validate]
};