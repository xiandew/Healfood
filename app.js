// Set up express
let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let expressValidator = require('express-validator');
app.use(expressValidator());

app.use(express.static('public'));

// set the view engine
app.set('view engine', 'pug');

// Database setup
require('./models/db.js');

// Routes setup
let routes = require('./routes/routes.js');
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Express listening on port ${PORT}`);
});