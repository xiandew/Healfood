let mongoose = require('mongoose');
let Review = mongoose.model('reviews');
let Restaurant = mongoose.model('restaurants');

let GET_reviews = function (req, res) {
    Review.find(function (err, reviews) {
       if (!err) {
            res.render('review-list', {
                reviews: reviews
            });
        } else {
            res.sendStatus(404);
        }
    });
};

let GET_reviewByID = function (req, res) {
    Review.findById(req.params.id, function (err, review) {
        if (!err) {
            res.render('review', {
                review: review
            });
        } else {
            res.sendStatus(404);
        }
    });
};

let GET_editReview = function (req, res) {
    Restaurant.findById(req.params.rstrnt_id, function (err, rstrnt) {
        if (!err && rstrnt) {
            Review.findById(req.params.review_id, function (err, review) {
                if (!err && review) {
                    res.render('edit-review', {
                        restaurant: rstrnt,
                        review: review
                    });
                } else {
                    res.render('edit-review', {
                        restaurant: rstrnt
                    });
                }
                delete req.session.msg;
                req.session.save();
            });
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.GET_reviews = GET_reviews;
module.exports.GET_editReview = GET_editReview;

// Add a new review if review_id is not present in the database,
// otherwise update the existing review
let POST_editReview = function (req, res) {
    Review.findOne({_id: req.params.review_id}, function (err, review) {

        let newReview = {
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            user_id: req.session.user._id,
            restaurant_id: req.params.rstrnt_id,
            //Not sure how to get restaurant name
            restaurant_name: req.body.name
        };

        if (review) {
            // update instead if review already exists
            Object.assign(review, newReview);
        } else {
            // Create the restaurant if the restaurant doesn't exist
            review = new Review(newReview);
        }

        // Save the restaurant
        review.save(function (err) {
            if (err) {
                return res.status(500).send({msg: err.message});
            } else {
                // TODO update the average rating of corresponding restaurant
            }
        });

        req.session.msg = "Review updated!";
        req.session.save();
        return res.redirect(req.param.id ? req.originalUrl : '/edit-review/' + review.restaurant_id + '/' + review._id);
    });
};

module.exports.POST_editReview = POST_editReview;
module.exports.GET_reviewByID = GET_reviewByID;