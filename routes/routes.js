let express = require("express");
let router = express.Router();

let controllers = require("../controllers/controllers.js");

router.get("/", controllers.test);

module.exports = router;