// Set up express
let express = require('express');
let app = express();

const PORT = process.env.PORT || 3000;

// Database setup
// require('./models/db.js');

// Routes setup
let routes = require('./routes/routes.js');
app.use('/', routes);

// Start the server
app.listen(PORT, function(req,res){
    console.log(`Express listening on port ${PORT}`);
});