let express = require("express");
let router = express.Router();

let mainControllers = require("../controllers/mainControllers.js");
let userControllers = require("../controllers/userControllers.js");
let rstrntControllers = require("../controllers/rstrntControllers.js");

//Take the user to the Homepage
router.get("/", mainControllers.home);

//Take the user to the Maps Page
router.get("/maps", mainControllers.maps);

//Take the user to the Health Ratings Page
router.get("/ratings", mainControllers.ratings);

//Take the user to the Recommendations Page
router.get("/reviews", mainControllers.reviews);


router.get('/new-restaurant', rstrntControllers.newRestaurant);
router.get('/restaurants', rstrntControllers.findAllRestaurants);
router.get('/restaurants/id/:id', rstrntControllers.findRestaurantByID);
router.get('/restaurants/name/:name', rstrntControllers.findRestaurantByName);

router.post('/new-restaurant', rstrntControllers.POST_newRstrnt);

router.get('/new-review', function (req, res) {
    res.render('new-review');
});

router.get('/user', userControllers.GET_user);
router.get('/login', userControllers.GET_login);
router.get('/signup', userControllers.GET_signup);
router.get('/logout', userControllers.GET_logout);
router.get('/confirm-email/:token', userControllers.GET_confirmEmail);

router.post('/login', userControllers.POST_login);
router.post('/signup', userControllers.POST_signup);
router.post('/resend', userControllers.POST_resendToken);

router.use(function (req, res) {
    if (req.errors) {
        switch (req.url) {
            case '/login':
                userControllers.GET_login(req, res);
                break;
            case '/signup':
                userControllers.GET_signup(req, res);
                break;
        }
    }
    if (req.rstrntUpdated) {
        rstrntControllers.newRestaurant(req, res);
    }
});

module.exports = router;