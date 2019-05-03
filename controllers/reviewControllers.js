let mongoose = require('mongoose');
let Review = mongoose.model('reviews');
let Restaurant = mongoose.model('restaurants');

let GET_reviews = function(req, res){
    res.send('This is the reviews Page');
};

let GET_newReview = function (req, res) {

    res.render('edit-review');
};

module.exports.GET_reviews = GET_reviews;
module.exports.GET_newReview = GET_newReview;