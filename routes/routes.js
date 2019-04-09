let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

//Take the user to the Homepage
router.get("/home", function(req, res){
    res.send('This is the Homepage');
});

//Take the user to the Maps Page
router.get("/maps", function(req, res){
    res.send('This is the Maps Page');
});

//Take the user to the Health Ratings Page
router.get("/ratings", function(req, res){
    res.send('This is the Health Ratings Page');
});

//Take the user to the Recommendations Page
router.get("/recommendations", function(req, res){
    res.send('This is the Recommendations Page');
});

//Find a restaurant by ID
router.get('/restaurants/id/:id', function(req,res){
    res.send("Restaurant Ids");
    Restaurant.find(function(err,restaurants){
        if(!err){
            res.send(restaurants);
        }else{
            res.sendStatus(404);
        }
    });
});

//List all restaurants
router.get('/restaurants', function(req,res){
    var restInx = req.params.id;
    Restaurant.findById(restInx,function(err,restaurant){
        res.send("List of all the Restaurants");
        if(!err){
            res.send(restaurant);
        }else{
            res.sendStatus(404);
        }
    });
});

//Find restaurant by name
router.get('/restaurants/name/:name', function(req, res){
    var restName = req.params.name;
    Restaurant.find({name:restName},function(err,restaurant){
        res.send("Restaurant name");
        if(!err){
            res.send(restaurant);
        }else{
            res.sendStatus(404);
        }
    });
});

module.exports = router;