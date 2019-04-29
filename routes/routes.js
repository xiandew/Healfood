let express = require("express");
let router = express.Router();

let mainControllers = require("../controllers/mainControllers.js");
let userControllers = require("../controllers/userControllers.js");

//Take the user to the Homepage
router.get("/", mainControllers.home);

//Take the user to the Maps Page
router.get("/maps", mainControllers.maps);

//Take the user to the Health Ratings Page
router.get("/ratings", mainControllers.ratings);

//Take the user to the Recommendations Page
router.get("/reviews", mainControllers.reviews);

//List all restaurants
router.get('/restaurants', mainControllers.findAllRestaurants);

//Find a restaurant by ID
router.get('/restaurants/id/:id', mainControllers.findRestaurantByID);

//Find restaurant by name
router.get('/restaurants/name/:name', mainControllers.findRestaurantByName);

router.get('/new-review', function (req, res) {
    res.render('new-review');
});

router.get('/signup', function (req, res) {
    res.render('user', {
        buttonName: "sign up"
    });
});
router.get('/login', function (req, res) {
    res.render('user', {
        buttonName: "log in"
    });
});

router.post('/login', userControllers.login);
router.post('/signup', userControllers.signup);
router.post('/confirmation', userControllers.confirmEmail);
router.post('/resend', userControllers.resendToken);

module.exports = router;