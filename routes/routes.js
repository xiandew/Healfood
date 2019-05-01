let express = require("express");
let router = express.Router();

let mainControllers = require("../controllers/mainControllers.js");
let userControllers = require("../controllers/userControllers.js");
let rstrntControllers = require("../controllers/rstrntControllers.js");
let reviewControllers = require("../controllers/reviewControllers.js");


router.get("/", mainControllers.home);
router.get("/maps", mainControllers.maps);


// restaurant logic
router.get('/new-restaurant', userControllers.isLoggedIn, rstrntControllers.newRestaurant);
router.get('/restaurants', rstrntControllers.findAllRestaurants);
router.get('/restaurants/id/:id', rstrntControllers.findRestaurantByID);
router.get('/restaurants/name/:name', rstrntControllers.findRestaurantByName);

router.post('/new-restaurant', rstrntControllers.POST_newRstrnt);


// review logic
router.get("/reviews", reviewControllers.GET_reviews);
router.get('/new-review/:rstrnt_id', userControllers.isLoggedIn, reviewControllers.GET_newReview);


// user logic
router.get('/user', userControllers.GET_user);
router.get('/login', userControllers.GET_login);
router.get('/signup', userControllers.GET_signup);
router.get('/logout', userControllers.GET_logout);
router.get('/confirm-email/:token', userControllers.GET_confirmEmail);

router.post('/login', userControllers.POST_login);
router.post('/signup', userControllers.POST_signup);
router.post('/resend', userControllers.POST_resendToken);


module.exports = router;