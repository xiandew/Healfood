// Create database
const mongoose = require('mongoose');
const config = require("../config/config");

mongoose.connect(config.mongoDB.dbURI, config.mongoDB.options,
    function(err){
        if(!err){
            console.log('Connected to mongo');
        }else{
            console.log('Failed to connect to mongo: ' + err);
        }
    }
);

require('./restaurants.js');
require('./users.js');
require('./reviews.js');