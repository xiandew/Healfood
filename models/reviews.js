let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = Schema(
    {
        "title": String,
        "description": String,
        "rating": Number,
        "date": {type: Date, required: true, default: Date.now},
        "user": {type: Schema.Types.ObjectId, ref: 'users'},
        "restaurant": {type: Schema.Types.ObjectId, ref: 'restaurants'}
    }
);
reviewSchema.index({user: 1, restaurant: 1}, {unique: true});

mongoose.model('reviews', reviewSchema);
