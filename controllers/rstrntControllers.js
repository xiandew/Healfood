let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

let findAllRestaurants = function(req,res){
    Restaurant.find(function(err, restaurants){
        if(!err){
            res.render('restaurants', {
                restaurants: restaurants
            });
        }else{
            res.sendStatus(404);
        }
    });
};

let findRestaurantByID = function(req,res){
    Restaurant.findById(req.params.id,function(err,restaurant){
        if(!err){
            res.render('detail', {
                r: restaurant
            });
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

module.exports.findAllRestaurants = findAllRestaurants;
module.exports.findRestaurantByID = findRestaurantByID;
module.exports.findRestaurantByName = findRestaurantByName;