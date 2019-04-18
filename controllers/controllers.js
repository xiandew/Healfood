let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

let welcome = function(req, res){
    res.sendFile('/index.html');
};

let home = function(req, res){
    res.send('This is the Homepage');
};

let maps = function(req, res){
    res.send('This is the Maps Page');
};

let ratings = function(req, res){
    res.send('This is the Health Ratings Page');
};

let recommendations = function(req, res){
    res.send('This is the Recommendations Page');
};

let findAllRestaurants = function(req,res){
    Restaurant.find(function(err,restaurants){
        if(!err){
            res.write("List of all the Restaurants\n");
            res.write(restaurants.toString());
            res.send();
        }else{
            res.sendStatus(404);
        }
    });
};

let findRestaurantByID = function(req,res){
    let restInx = req.params.id;
    Restaurant.findById(restInx,function(err,restaurant){
        if(!err){
            res.write(`Restaurant ID: ${restInx}\n`);
            res.write(restaurant.toString());
            res.send();
        }else{
            res.sendStatus(404);
        }
    });
};

let findRestaurantByName = function(req, res){
    let restName = req.params.name;
    Restaurant.find({name:restName},function(err,restaurant){
        if(!err){
            res.write(`Restaurant name: ${restName}\n`);
            res.write(restaurant.toString());
            res.send();
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.welcome = welcome;
module.exports.home = home;
module.exports.maps = maps;
module.exports.ratings = ratings;
module.exports.recommendations = recommendations;
module.exports.findAllRestaurants = findAllRestaurants;
module.exports.findRestaurantByID = findRestaurantByID;
module.exports.findRestaurantByName = findRestaurantByName;