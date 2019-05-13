// Set up express
let express = require('express');
let app = express();

// Database setup
require('./models/db.js');

// set the view engine
app.set('view engine', 'pug');

app.use(express.static('public'));

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let expressSession = require('express-session');
app.use(expressSession({
    secret: 'secret-code',
    cookie: {maxAge: 86400},
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    app.locals.session = req.session;
    next();
});

// Routes setup
let routes = require('./routes/routes.js');
app.use('/', routes);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Express listening on port ${PORT}`);
});
