let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let restaurantSchema = Schema(
    {
        "name": String,
        "address": String,
        "rating": {type: Number, default: -1},
        "description": String,
        "photo": String,
        "lastModified": {type: Date, default: Date.now},
        "coord": {type: String, unique: true},
        "reviews": [{type: Schema.Types.ObjectId, ref: "reviews"}],
        "owners": [{type: Schema.Types.ObjectId, ref: "users"}]
    }
);
mongoose.model('restaurants', restaurantSchema);
