let GET_user = function (req, res) {
    res.render('user');
};
let GET_login = function (req, res) {
    res.render('auth', {
        action: "log in",
        errors: req.errors,
        body:req.body
    });
};
let GET_signup = function (req, res) {
    res.render('auth', {
        action: "sign up",
        errors: req.errors,
        body:req.body
    });
};
let GET_logout = function (req, res) {
    delete app.locals.session;
    req.session.destroy();
    res.redirect('/');
};

/**
 * Reference: https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
 *
 * POST /login
 * Sign in with email and password
 */
let crypto = require('crypto');
let nodemailer = require('nodemailer');
let mongoose = require('mongoose');
let User = mongoose.model('users');
let Token = mongoose.model('tokens');

let POST_login = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    // Check for validation erro
    var errors = req.validationErrors();
    if (errors) {
        req.errors = errors;
        req.action = "log in";
        return next();
    }

    User.findOne({email: req.body.email}, function (err, user) {
        if (!user) return res.status(401).send({
            msg: `The email address ${req.body.email} is not associated with any account.
            Double-check your email address and try again.`
        });

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
                throw new Error(err);
            }
            if (!isMatch) {
                return res.status(401).send({
                    msg: 'Invalid email or password'
                });
            }

            // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).send({
                type: 'not-verified',
                msg: 'Your account has not been verified.'
            });

            // Login successful
            req.session.user = user;
            app.locals.session = req.session;
            res.redirect('/');
        });
    });
};

/**
 * POST /signup
 */
let POST_signup = function (req, res, next) {
    req.assert('username', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password must be at least 8 characters long').len(8);
    req.assert('password', 'Passwords do not match').equals(req.body.confirmPwd);
    req.sanitize('email').normalizeEmail({remove_dots: false});

    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) {
        req.errors = errors;
        return next();
    }

    // Make sure this account doesn't already exist
    User.findOne({email: req.body.email}, function (err, user) {

        // Make sure user doesn't already exist
        if (user) return res.status(400).send({
            msg: 'The email address you have entered is already associated with another account.'
        });

        // Create and save the user
        user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        user.save(function (err) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }

            // Create a verification token for this user
            let token = new Token({
                _userId: user._id,
                token: crypto.randomBytes(16).toString('hex')
            });

            // Save the verification token
            token.save(function (err) {
                if (err) {
                    return res.status(500).send({msg: err.message});
                }

                // Send the email
                let transporter = nodemailer.createTransport({
                    service: 'SendGrid',
                    auth: {
                        user: "apikey",
                        pass: "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"
                    }
                });
                let mailOptions = {
                    from: 'xiandew@student.unimelb.edu.au',
                    to: user.email,
                    subject: 'Account Verification Token',
                    text: `Hello, ${user.name}\n\nPlease verify your account by clicking the link: \n
                    http://${req.headers.host}/confirm-email/${token.token}.\n`
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({msg: err.message});
                    }
                    res.status(200).send(`A verification email has been sent to ${user.email}.`);
                });
            });
        });
    });
};

/**
 * When the user clicks the link in the confirmation email.
 * GET /confirm-email
 */
let GET_confirmEmail = function (req, res) {

    // Find a matching token
    Token.findOne({token: req.params.token}, function (err, token) {
        if (!token) {
            return res.status(400).send({
                type: 'not-verified',
                msg: 'We were unable to find a valid token. Your token may have expired.'
            });
        }

        // If we found a token, find a matching user
        User.findOne({_id: token._userId}, function (err, user) {
            if (!user)
                return res.status(400).send({
                    msg: 'We were unable to find a user for this token.'
                });
            if (user.isVerified)
                return res.status(400).send({
                    type: 'already-verified',
                    msg: 'This user has already been verified.'
                });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) {
                    return res.status(500).send({
                        msg: err.message
                    });
                }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
};

/**
 * It’s inevitable that some users will not be able to verify their account before their token expires.
 * We’re going to need a mechanism for reissuing confirmation tokens.
 * POST /resend
 */
let POST_resendToken = function (req, res) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    User.findOne({email: req.body.email}, function (err, user) {
        if (!user)
            return res.status(400).send({
                msg: 'We were unable to find a user with that email.'
            });
        if (user.isVerified)
            return res.status(400).send({
                msg: 'This account has already been verified. Please log in.'
            });

        // Create a verification token, save it, and send email
        var token = new Token({
            _userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });

        // Save the token
        token.save(function (err) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }

            // Send the email
            var transporter = nodemailer.createTransport({
                service: 'Sendgrid',
                auth: {user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD}
            });
            var mailOptions = {
                from: 'no-reply@codemoto.io',
                to: user.email,
                subject: 'Account Verification Token',
                text: `Hello,\n\nPlease verify your account by clicking the link: \n
                http:\/\/${req.headers.host}\/confirmation\/${token.token}.\n`
            };
            transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    return res.status(500).send({msg: err.message});
                }
                res.status(200).send(`A verification email has been sent to ${user.email}.`);
            });
        });

    });
};

module.exports.GET_user = GET_user;
module.exports.GET_login = GET_login;
module.exports.GET_signup = GET_signup;
module.exports.GET_logout = GET_logout;
module.exports.GET_confirmEmail = GET_confirmEmail;
module.exports.POST_login = POST_login;
module.exports.POST_signup = POST_signup;
module.exports.POST_resendToken = POST_resendToken;