let isLoggedIn = function (req, res, next) {
    if (!req.session.user) {
        req.session.errors = [{msg: "Please log in"}];
        req.session.redirect_url = req.url;
        req.session.save();
        return res.redirect('/login');
    }
    next();
};

module.exports.isLoggedIn = isLoggedIn;


let GET_user = function (req, res) {
    res.render('user/user', {
        title: "My account"
    });
};

function auth(action, req, res) {
    res.render('user/auth', {
        title: action,
        action: action
    });
    delete req.session.errors;
    delete req.session.msg;
    delete req.session.body;
    req.session.save();
}

let GET_login = function (req, res) {
    auth("log in", req, res);
};
let GET_signup = function (req, res) {
    auth("sign up", req, res);
};

let GET_logout = function (req, res) {
    delete req.session.user;
    req.session.save();
    return res.redirect('/');
};

/**
 * When the user clicks the link in the confirmation email.
 * GET /confirm-email
 */
let GET_confirmEmail = function (req, res) {

    // Find a matching token
    Token.findOne({token: req.params.token}, function (err, token) {
        if (!token) {
            req.session.errors = [{msg: 'We were unable to find a valid token. Your token may have expired.'}];
            req.session.save();
            return res.redirect('/resend');
        }

        // If we found a token, find a matching user
        User.findOne({_id: token._userId}, function (err, user) {
            if (!user) {
                req.session.errors = [{msg: 'We were unable to find a user for this token. The account may be deleted'}];
                req.session.save();
                return res.redirect('/signup');
            }
            if (user.isVerified) {
                req.session.errors = [{msg: 'This user has already been verified.'}];
                req.session.save();
                return res.redirect('/login');
            }

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) {
                    req.session.errors = [{msg: err.message}];
                    req.session.save();
                    return res.redirect('/resend');
                }
                req.session.msg = "The account has been verified. Please log in.";
                req.session.save();
                return res.redirect('/login');
            });
        });
    });
};

let GET_resendToken = function (req, res) {
    auth("resend token", req, res);
};

module.exports.GET_user = GET_user;
module.exports.GET_login = GET_login;
module.exports.GET_signup = GET_signup;
module.exports.GET_logout = GET_logout;

module.exports.GET_confirmEmail = GET_confirmEmail;
module.exports.GET_resendToken = GET_resendToken;


/**
 * Reference: https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
 *
 * POST /login
 * Sign in with email and password
 */
let mongoose = require('mongoose');
let User = mongoose.model('users');
let Token = mongoose.model('tokens');
let crypto = require('crypto');
let nodemailer = require('nodemailer');

// settings for sending email
let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: "apikey",
        pass: "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"
    }
});
let mailOptions = {
    from: 'xiandew@student.unimelb.edu.au',
};
let POST_login = function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (!user) {
            req.session.errors = [{
                msg: `The email address ${req.body.email} is not associated with any account.
                Double-check your email address and try again.`
            }];
            req.session.save();
            return res.redirect(req.url);
        }

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
                throw new Error(err);
            }
            if (!isMatch) {
                req.session.errors = [{msg: 'Invalid password'}];
                req.session.save();
                return res.redirect(req.url);
            }

            // Make sure the user has been verified
            if (!user.isVerified) {
                req.session.errors = [{
                    msg: `Your account has not been verified.
                    Please verify your account by click the link sent to ${req.body.email}`
                }];
                req.session.save();
                return res.redirect(req.url);
            }

            // Login successful
            req.session.user = user;
            let redirect_url = '/';
            if (req.session.redirect_url) {
                redirect_url = req.session.redirect_url;
                delete req.session.redirect_url;
            }
            req.session.save();
            return res.redirect(redirect_url);
        });
    });
};

/**
 * POST /signup
 */
let POST_signup = function (req, res) {

    // Make sure this account doesn't already exist
    User.findOne({email: req.body.email}, function (err, user) {

        // Make sure user doesn't already exist
        if (user) {
            req.session.errors = [{msg: 'The email address you have entered is already associated with another account.'}];
            req.session.save();
            return GET_signup(req, res);
        }

        // Create and save the user
        user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        user.save(function (err) {
            if (err) {
                req.session.errors = [{msg: err.message}];
                req.session.save();
                return GET_signup(req, res);
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

                mailOptions.to = user.email;
                mailOptions.subject = 'Account Verification Token';
                mailOptions.text = `Hello, ${user.name}\n\nPlease verify your account by visiting the link: \n
                    http://${req.headers.host}/confirm-email/${token.token}\n
                    Note: Be sure to check your spam folder as well!`;

                // Send the email
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        req.session.errors = [{msg: err.message}];
                        req.session.save();
                        return GET_signup(req, res);
                    }
                    req.session.msg = `A verification email has been sent to ${user.email}.`;
                    req.session.save();
                    return GET_signup(req, res);
                });
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

    User.findOne({email: req.body.email}, function (err, user) {
        if (!user) {
            req.session.errors = [{msg: 'We were unable to find a user with that email.'}];
            req.session.save();
            return GET_resendToken(req, res);
        }
        if (user.isVerified) {
            req.session.errors = [{msg: 'This account has already been verified. Please log in.'}];
            req.session.save();
            return res.redirect('/login');
        }

        // Create a verification token, save it, and send email
        let token = new Token({
            _userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });

        // Save the token
        token.save(function (err) {
            if (err) {
                req.session.errors = [{msg: err.message}];
                req.session.save();
                return GET_resendToken(req, res);
            }

            mailOptions.to = user.email;
            mailOptions.subject = 'Account Verification Token';
            mailOptions.text = `Hello, ${user.name}\n\nPlease verify your account by visiting the link: \n
                    http://${req.headers.host}/confirm-email/${token.token}\n
                    Note: Be sure to check your spam folder as well!`;

            // Send the email
            transporter.sendMail(mailOptions, function (err) {
                if (err) {
                    req.session.errors = [{msg: err.message}];
                } else {
                    req.session.msg = `A verification email has been sent to ${user.email}.`;
                }
                req.session.save();
                return GET_resendToken(req, res);
            });
        });

    });
};

module.exports.POST_login = POST_login;
module.exports.POST_signup = POST_signup;
module.exports.POST_resendToken = POST_resendToken;