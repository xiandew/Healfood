let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

/**
 * GET
 */
let GET_editRestaurant = function (req, res) {
    Restaurant.findById(req.params.id, function (err, rstrnt) {
        if (!err) {
            res.render('restaurants/edit-rstrnt', {
                title: "Edit restaurant",
                restaurant: rstrnt
            });
            delete req.session.errors;
            delete req.session.msg;
            req.session.save();
        } else {
            res.render('restaurants/edit-rstrnt', {
                title: "Add new restaurant"
            });
        }
    });
};
let GET_allRestaurants = function (req, res) {
    Restaurant.find(null, null, {sort: {lastModified: -1}}, function (err, rstrnts) {
        if (!err) {
            res.render('restaurants/rstrnts', {
                title: "Restaurants",
                rstrnts: rstrnts
            });
        } else {
            res.sendStatus(404);
        }
    });
};
let GET_restaurantByID = function (req, res) {
    Restaurant.findById(req.params.id)
        .populate({
            path: "reviews",
            populate:
                [{
                    path: "user"
                }, {
                    path: "restaurant"
                }]
        })
        .then(function (rstrnt) {
            res.render('restaurants/rstrnt', {
                title: "Restaurant",
                restaurant: rstrnt
            });
        });
};
let GET_restaurantByName = function (req, res) {
    Restaurant.find({name: req.params.name}, function (err, rstrnt) {
        if (!err) {
            res.write(`Restaurant name: ${rstrnt.name}\n`);
            res.write(rstrnt.toString());
            res.send();
        } else {
            res.sendStatus(404);
        }
    });
};
let GET_deleteRestaurant = function (req, res) {
    Restaurant.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            res.send(err);
        } else {
            req.session.msg = "Restaurant deleted!";
            return res.redirect('/edit-restaurant');
        }
    });
};

module.exports.GET_editRestaurant = GET_editRestaurant;
module.exports.GET_allRestaurants = GET_allRestaurants;
module.exports.GET_restaurantByID = GET_restaurantByID;
module.exports.GET_restaurantByName = GET_restaurantByName;
module.exports.GET_deleteRestaurant = GET_deleteRestaurant;

/**
 * POST
 */
let POST_editRestaurant = function (req, res) {
    // Make sure this address doesn't already exist
    Restaurant.findOne({_id: req.params.id}, function (err, rstrnt) {

        let newRstrnt = {
            name: req.body.name,
            address: req.body.address,
            coord: req.body.coord,
            description: req.body.description
        };

        if (req.file) {
            newRstrnt.photo = req.file.url;
        }

        if (rstrnt) {
            // update instead if restaurant already exists
            Object.assign(rstrnt, newRstrnt);
        } else {
            // Create the restaurant if the restaurant doesn't exist
            rstrnt = new Restaurant(newRstrnt);
        }

        // Save the restaurant
        rstrnt.save(function (err) {
            if (err) return res.status(500).send({msg: err.message});
        });
        req.session.msg = "Restaurant updated!";
        req.session.save();
        return res.redirect(req.param.id ? req.originalUrl : '/edit-restaurant/' + rstrnt._id);
    });
};

module.exports.POST_editRestaurant = POST_editRestaurant;