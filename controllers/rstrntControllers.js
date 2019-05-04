let mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants');

/**
 * GET
 */
let GET_editRestaurant = function (req, res) {
    Restaurant.findById(req.params.id, function (err, rstrnt) {
        if (!err) {
            res.render('edit-rstrnt', {
                msg: req.session.msg,
                r: rstrnt
            });
            delete req.session.msg;
            req.session.save();
        } else {
            res.render('edit-rstrnt');
        }
    });
};
let GET_allRestaurants = function (req, res) {
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
let GET_restaurantByID = function (req, res) {
    Restaurant.findById(req.params.id, function (err, rstrnt) {
        if (!err) {
            res.render('rstrnt', {
                r: rstrnt
            });
        } else {
            res.sendStatus(404);
        }
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

module.exports.GET_editRestaurant = GET_editRestaurant;
module.exports.GET_allRestaurants = GET_allRestaurants;
module.exports.GET_restaurantByID = GET_restaurantByID;
module.exports.GET_restaurantByName = GET_restaurantByName;

/**
 * POST
 */

/**
 * Reference: https://github.com/expressjs/multer
 */
let multer = require("multer");
let path = require('path');
let fs = require("fs");
let storage = multer.diskStorage({
    destination: 'public/images/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
let parser = multer({storage: storage});
let POST_editRestaurant = [parser.single("photo"), function (req, res) {
    // Make sure this address doesn't already exist
    Restaurant.findOne({address: req.body.address}, function (err, rstrnt) {

        let newRstrnt = {
            name: req.body.name,
            address: req.body.address,
            description: req.body.description
        };

        if (req.file) {
            // remove the old photo file
            fs.unlink('public' + rstrnt.photo, function (err) {
                if (err) throw err;
            });
            newRstrnt.photo = '/images/uploads/' + req.file.filename;
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
        req.params.id = rstrnt._id;
        return GET_editRestaurant(req, res);
    });
}];

module.exports.POST_editRestaurant = POST_editRestaurant;