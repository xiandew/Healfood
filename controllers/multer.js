/**
 * Reference: https://github.com/expressjs/multer
 */
let multer = require("multer");
let cloudinary = require("cloudinary");
let cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: "damdpx5ge",
    api_key: "287161176894839",
    api_secret: "CVn3CIAqD94HRuPZRiCz4UUCtQw"
});

let storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

let parser = multer({storage: storage});
module.exports.parser = parser;