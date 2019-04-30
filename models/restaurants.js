let mongoose = require('mongoose');
let restaurantSchema = mongoose.Schema(
    {
        "name": String,
        "address": {type: String, unique: true},
        "rating": String,
        "description": String,
        "photo": String
    }
);
mongoose.model('restaurants', restaurantSchema);
