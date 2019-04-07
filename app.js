// Set up express
let express = require('express');
let app = express();

// Database setup
// require('./models/db.js');

// Routes setup
let routes = require('./routes/routes.js');
app.use('/',routes);

// Start the server
app.listen(3000,function(req,res){
    console.log('Express listening on port 3000');
});