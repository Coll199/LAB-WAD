var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');

var mongodbUri = 'mongodb://admin:admin@ds113445.mlab.com:13445/wadproj';

app.use(cors());

//connect to MongoDB
mongoose.connect(mongodbUri, {
  useMongoClient: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30
});
var db = mongoose.connection;

//handle mongo error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

db.once('open', function () {
  // we're connected!
  console.log('Database connection established');
});


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// serve static files from template
app.use(express.static(__dirname + '/loginpage'));
app.use(express.static(__dirname + '/skifree'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
