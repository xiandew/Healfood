// Set up express
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Not sure if this is needed right now
/* // Application setting properties
app.set('views','./views');
app.set('view engine', 'pug');

// Route to render Pug files
app.get('/', function (req, res) {
    res.render('index', { title: 'The Artisans', message: 'HealFood'})
}); */

// Database setup
require('./models/db.js');

// Routes setup
let routes = require('./routes/routes.js');
app.use('/', routes);

// Start the server
app.listen(PORT, function(req,res){
    console.log(`Express listening on port ${PORT}`);
});