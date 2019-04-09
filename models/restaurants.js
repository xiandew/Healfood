let mongoose = require('mongoose');
let restaurantSchema = mongoose.Schema(
    {
            "name": String,
            "address": String,
            "distance": String,
            "rating": String,
            "photo": String
    }
);
mongoose.model('restaurants', restaurantSchema);
