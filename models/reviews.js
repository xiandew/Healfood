let mongoose = require('mongoose');
let reviewSchema = mongoose.Schema(
    {
        "title": String,
        "description": String,
        "rating": Number,
        "date": Date,
        "user_id": String,
        "restaurant_id": String
    }
);
mongoose.model('reviews', reviewSchema);
