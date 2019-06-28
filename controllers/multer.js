/**
 * Reference: https://github.com/expressjs/multer
 */
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const config = require("../config/config");

cloudinary.config(config.cloudinary);

let storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

let parser = multer({storage: storage});
module.exports.parser = parser;