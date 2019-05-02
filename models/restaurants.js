let mongoose = require('mongoose');
let restaurantSchema = mongoose.Schema(
    {
        "name": String,
        "address": {type: String, unique: true},
        "rating": {type: String, default: -1},
        "description": String,
        "photo": String
    }
);
mongoose.model('restaurants', restaurantSchema);
