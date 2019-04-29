let mongoose = require('mongoose');
let restaurantSchema = mongoose.Schema(
    {
        "name": String,
        "address": {type: String, unique: true},
        "distance": String,
        "rating": String,
        "photo": String
    }
);
mongoose.model('restaurants', restaurantSchema);
