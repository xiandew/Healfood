let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

let home = function (req, res) {
    Restaurant.find({"photo": {$exists: true}}, null, {sort: {lastModified: -1}}, function (err, rstrnts) {
        if (!err) {
            res.render('index', {
                rstrnts: rstrnts
            });
        } else {
            res.sendStatus(404);
        }
    }).limit(5);
};

let TBD = function (req, res) {
    res.send("To be done");
};

module.exports.home = home;
module.exports.TBD = TBD;
