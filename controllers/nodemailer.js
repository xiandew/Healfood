let nodemailer = require('nodemailer');

// settings for sending email
let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: "apikey",
        pass: "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"
    }
});

module.exports.transporter = transporter;