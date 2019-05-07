let mongoose = require('mongoose');
let restaurantSchema = mongoose.Schema(
    {
        "name": String,
        "address": {type: String, unique: true},
        "rating": {type: String, default: -1},
        "description": String,
        "photo": String,
        "lastModified": {type: Date, default: Date.now}
    }
);
mongoose.model('restaurants', restaurantSchema);
