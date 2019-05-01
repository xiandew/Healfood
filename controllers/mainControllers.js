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

module.exports.home = home;
module.exports.maps = maps;