let mongoose = require('mongoose');
let Review = mongoose.model('reviews');
let Restaurant = mongoose.model('restaurants');
let User = mongoose.model('users');

let GET_reviews = function (req, res) {
    Review.find(null, null, {sort: {date: -1}})
        .populate('user')
        .populate('restaurant')
        .then(reviews => {
            res.render('reviews/reviews', {
                reviews: reviews
            });
        });
};

let GET_reviewByID = function (req, res) {
    Review.findById(req.params.id)
        .populate("restaurant")
        .then(function (review) {
            res.render('reviews/review', {
                review: review
            });
        });
};

let GET_editReview = function (req, res) {
    Restaurant.findById(req.params.rstrnt_id, function (err, rstrnt) {
        if (!err && rstrnt) {
            Review.findById(req.params.review_id, function (err, review) {
                if (!err && review) {
                    res.render('reviews/edit-review', {
                        restaurant: rstrnt,
                        review: review
                    });
                } else {
                    res.render('reviews/edit-review', {
                        restaurant: rstrnt
                    });
                }
                delete req.session.errors;
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

// remove duplicate
function rm_duplicate(arr) {
    return arr.filter(function (r, i) {
        return arr.indexOf(r) === i;
    });
}

// Add a new review if review_id is not present in the database,
// otherwise update the existing review
let POST_editReview = function (req, res) {
    Review.findOne({_id: req.params.review_id}, function (err, review) {

        let newReview = {
            title: req.body.title,
            description: req.body.description,
            rating: parseFloat(req.body.rating),
            user: req.session.user._id,
            restaurant: req.params.rstrnt_id
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
                if (err.code === 11000) {
                    req.session.errors = [{
                        msg: "Sorry but you are only allowed one review per restaurant. " +
                            "Consider update the previous one"
                    }];
                } else {
                    req.session.errors = [{msg: err.errmsg}];
                }
                req.session.save();
                return res.redirect(req.originalUrl);
            } else {
                User.findById(req.session.user._id, (err, usr) => {
                    usr.reviews.push(review._id);
                    usr.reviews = rm_duplicate(usr.reviews);
                    usr.save();
                });
                Restaurant.findById(req.params.rstrnt_id)
                    .then(rstrnt => {
                        rstrnt.reviews.push(review._id);
                        rstrnt.reviews = rm_duplicate(rstrnt.reviews);

                        rstrnt.save(() => {
                            Restaurant.populate(rstrnt, "reviews", () => {
                                let totalReview = 0;
                                for (let i = rstrnt.reviews.length - 1; i >= 0; i--) {
                                    let r = rstrnt.reviews[i];
                                    if (!r.rating) {
                                        rstrnt.reviews.splice(i, 1);
                                    } else {
                                        totalReview += r.rating;
                                    }
                                }
                                rstrnt.rating = totalReview / rstrnt.reviews.length;
                                rstrnt.save();
                            })
                        });
                    });
                req.session.msg = "Review updated!";
                req.session.save();
                return res.redirect('/edit-review/' + review.restaurant._id + '/' + review._id);
            }
        });
    });
};

module.exports.POST_editReview = POST_editReview;
module.exports.GET_reviewByID = GET_reviewByID;