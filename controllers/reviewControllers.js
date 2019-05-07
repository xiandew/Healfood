let mongoose = require('mongoose');
let Review = mongoose.model('reviews');
let Restaurant = mongoose.model('restaurants');

let GET_reviews = function (req, res) {
    res.send('This is the reviews Page');
};

let GET_editReview = function (req, res) {
    Restaurant.findById(req.params.rstrnt_id, function (err, rstrnt) {
        if (!err && rstrnt) {
            res.render('edit-review', {
                r: rstrnt
            });
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.GET_reviews = GET_reviews;
module.exports.GET_editReview = GET_editReview;

let POST_editReview = function (req, res) {
    Review.findOne({_id: req.params.review_id}, function (err, review) {
        
    });
};

module.exports.POST_editReview = POST_editReview;