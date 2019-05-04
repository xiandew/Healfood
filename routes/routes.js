let express = require("express");
let router = express.Router();

let mainControllers = require("../controllers/mainControllers.js");
let userControllers = require("../controllers/userControllers.js");
let rstrntControllers = require("../controllers/rstrntControllers.js");
let reviewControllers = require("../controllers/reviewControllers.js");


router.get("/", mainControllers.home);
router.get("/maps", mainControllers.maps);


// restaurant logic
router.get('/restaurants', rstrntControllers.GET_allRestaurants);
router.get('/restaurants/id/:id', rstrntControllers.GET_restaurantByID);
router.get('/restaurants/name/:name', rstrntControllers.GET_restaurantByName);
router.get(
    ['/edit-restaurant', '/edit-restaurant/:id'],
    userControllers.isLoggedIn,
    rstrntControllers.GET_editRestaurant
);

router.post(
    ['/edit-restaurant', '/edit-restaurant/:id'],
    rstrntControllers.POST_editRestaurant
);


// review logic
router.get('/reviews', reviewControllers.GET_reviews);
router.get(
    ['/edit-review/:rstrnt_id', '/edit-review/:rstrnt_id/:review_id'],
    userControllers.isLoggedIn,
    reviewControllers.GET_editReview
);

router.post(
    ['/edit-review/:rstrnt_id', '/edit-review/:rstrnt_id/:review_id'],
    reviewControllers.POST_editReview
);

// user logic
router.get('/user', userControllers.GET_user);
router.get('/login', userControllers.GET_login);
router.get('/signup', userControllers.GET_signup);
router.get('/logout', userControllers.GET_logout);
router.get('/confirm-email/:token', userControllers.GET_confirmEmail);
router.get('/resend', userControllers.GET_resendToken);

router.post('/login', userControllers.POST_login);
router.post('/signup', userControllers.POST_signup);
router.post('/resend', userControllers.POST_resendToken);


module.exports = router;