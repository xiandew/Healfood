let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

let home = function(req, res){
    Restaurant.find(function(err, rstrnts){
        if(!err){
            res.render('index', {
                rstrnts: rstrnts
            });
        }else{
            res.sendStatus(404);
        }
    }).limit(5);
};

let maps = function(req, res){
    res.render('maps');
};

let ratings = function(req, res){
    res.send('This is the Health Ratings Page');
};

let reviews = function(req, res){
    res.send('This is the reviews Page');
};

module.exports.home = home;
module.exports.maps = maps;
module.exports.ratings = ratings;
module.exports.reviews = reviews;