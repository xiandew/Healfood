let express = require("express");
let router = express.Router();

let mainControllers = require("../controllers/mainControllers.js");
let userControllers = require("../controllers/userControllers.js");
let rstrntControllers = require("../controllers/rstrntControllers.js");
let reviewControllers = require("../controllers/reviewControllers.js");
let mapControllers = require("../controllers/mapControllers.js");
let multer = require("../controllers/multer.js");
let validator = require("../controllers/validator.js");


router.get("/", mainControllers.home);


// restaurant logic
router.get('/restaurants', rstrntControllers.GET_allRestaurants);
router.get('/restaurants/id/:id', rstrntControllers.GET_restaurantByID);
router.get('/restaurants/name/:name', rstrntControllers.GET_restaurantByName);
router.get(
    ['/edit-restaurant', '/edit-restaurant/:id'],
    userControllers.isLoggedIn,
    rstrntControllers.GET_editRestaurant
);
router.get('/deleteRestaurant/:id', rstrntControllers.GET_deleteRestaurant);

router.post(
    ['/edit-restaurant', '/edit-restaurant/:id'],
    multer.parser.single("photo"),
    validator.validateRstrntInput,
    rstrntControllers.POST_editRestaurant
);


// review logic
router.get('/reviews', reviewControllers.GET_reviews);
router.get('/reviews/id/:id', reviewControllers.GET_reviewByID);
router.get(
    ['/edit-review/:rstrnt_id', '/edit-review/:rstrnt_id/:review_id'],
    userControllers.isLoggedIn,
    reviewControllers.GET_editReview
);

router.post(
    ['/edit-review/:rstrnt_id', '/edit-review/:rstrnt_id/:review_id'],
    validator.validateReviewInput,
    reviewControllers.POST_editReview
);

// user logic
router.get('/user', userControllers.isLoggedIn, userControllers.GET_user);
router.get('/login', userControllers.GET_login);
router.get('/signup', userControllers.GET_signup);
router.get('/logout', userControllers.GET_logout);
router.get('/confirm-email/:token', userControllers.GET_confirmEmail);
router.get('/resend', userControllers.GET_resendToken);

router.post('/login', validator.validateUserInput, userControllers.POST_login);
router.post('/signup', validator.validateUserInput, userControllers.POST_signup);
router.post('/resend', validator.validateUserInput, userControllers.POST_resendToken);

// map
router.get(["/maps", "/maps/:rstrnt_id"], mapControllers.maps);

// TODO
router.get(["/change-email", "/reset-pwd", "/reviews/user/:user_id"], mainControllers.TBD);

module.exports = router;