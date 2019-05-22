let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

let userSchema = Schema({
    "name": {type: String, required: true},
    "email": {type: String, required: true, unique: true},
    "password": {type: String, required: true},
    "isVerified": {type: Boolean, default: false},
    "passwordResetToken": String,
    "passwordResetExpires": Date,
    "roles": [{type: String}],
    "reviews": [{type: Schema.Types.ObjectId, ref: "reviews"}],
    "ownedRstrnts": [{type: Schema.Types.ObjectId, ref: "restaurants"}]
});

/**
 * Reference: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 */
userSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err)
            return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err)
                return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

let tokenSchema = Schema({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: 43200}
});

mongoose.model('users', userSchema);
mongoose.model('tokens', tokenSchema);
