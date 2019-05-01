let mongoose = require('mongoose');
let reviewSchema = mongoose.Schema(
    {
        "title": String,
        "description": String,
        "rating": Number,
        "date": {type: Date, required: true, default: Date.now},
        "user_id": String,
        "restaurant_id": String
    }
);
mongoose.model('reviews', reviewSchema);
