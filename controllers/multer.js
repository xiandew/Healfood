/**
 * Reference: https://github.com/expressjs/multer
 */
let multer = require("multer");
let path = require('path');
let storage = multer.diskStorage({
    destination: 'public/images/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
let parser = multer({storage: storage});

module.exports.parser = parser;