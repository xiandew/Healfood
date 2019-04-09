// Create database
var mongoose = require('mongoose');

// mongodb+srv://samtafoya:<password>@cluster0-ch4dy.mongodb.net/test?retryWrites=true
mongoose.connect(
    'mongodb+srv://samtafoya:artisans@cluster0-ch4dy.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    },
    function(err){
        if(!err){
            console.log('Connected to mongo');
        }else{
            console.log('Failed to connect to mongo: ' + err);
        }
    }
);

require('./restaurants.js');