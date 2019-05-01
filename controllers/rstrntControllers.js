let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

/**
 * GET
 */
let newRestaurant = function (req, res) {
    res.render('new-rstrnt', {
        rstrntUpdated: req.rstrntUpdated,
        body: req.body
    });
};
let findAllRestaurants = function (req, res) {
    Restaurant.find(function (err, rstrnts) {
        if (!err) {
            res.render('rstrnt-list', {
                rstrnts: rstrnts
            });
        } else {
            res.sendStatus(404);
        }
    });
};
let findRestaurantByID = function (req, res) {
    Restaurant.findById(req.params.id, function (err, restaurant) {
        if (!err) {
            res.render('rstrnt-detail', {
                r: restaurant
            });
        } else {
            res.sendStatus(404);
        }
    });
};
let findRestaurantByName = function (req, res) {
    let restName = req.params.name;
    Restaurant.find({name: restName}, function (err, restaurant) {
        if (!err) {
            res.write(`Restaurant name: ${restName}\n`);
            res.write(restaurant.toString());
            res.send();
        } else {
            res.sendStatus(404);
        }
    });
};
module.exports.newRestaurant = newRestaurant;
module.exports.findAllRestaurants = findAllRestaurants;
module.exports.findRestaurantByID = findRestaurantByID;
module.exports.findRestaurantByName = findRestaurantByName;

/**
 * POST
 */

/**
 * Reference: https://github.com/expressjs/multer
 */
let multer = require("multer");
let path = require('path');
let storage = multer.diskStorage({
    destination: 'public/images/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
let parser = multer({storage: storage});
let POST_newRstrnt = [parser.single("photo"), function (req, res) {
    // Make sure this address doesn't already exist
    Restaurant.findOne({email: req.body.address}, function (err, rstrnt) {

        // Make sure user doesn't already exist
        if (rstrnt) return res.status(400).send({
            msg: 'The email address you have entered is already associated with another account.'
        });

        // Create and save the user
        rstrnt = new Restaurant({
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            photo: '/images/uploads/' + req.file.filename
        });

        rstrnt.save(function (err) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }
            return newRestaurant(req, res);
        });
    });
}];


module.exports.POST_newRstrnt = POST_newRstrnt;