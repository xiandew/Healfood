let express = require("express");
let router = express.Router();

let controllers = require("../controllers/controllers.js");

//The first page the user sees
router.get("/", controllers.welcome);

//Take the user to the Homepage
router.get("/home", controllers.home);

//Take the user to the Maps Page
router.get("/maps", controllers.maps);

//Take the user to the Health Ratings Page
router.get("/ratings", controllers.ratings);

//Take the user to the Recommendations Page
router.get("/recommendations", controllers.recommendations);

//List all restaurants
router.get('/restaurants', controllers.findAllRestaurants);

//Find a restaurant by ID
router.get('/restaurants/id/:id', controllers.findRestaurantByID);

//Find restaurant by name
router.get('/restaurants/name/:name', controllers.findRestaurantByName);

module.exports = router;