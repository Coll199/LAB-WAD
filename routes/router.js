var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/skifree/index.html'));
});


router.post('/login', function (req, res, next) {
  console.log(req.body);
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.send(true);
      }
    });
  } else {
      res.sendStatus(400);
  }

});

router.post('/register', function (req, res, next) { 
  if (req.body.username &&
    req.body.password) {

    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.password,
    }
     User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.send(true);
      }
    });
  }
});

/* old method for creating users and logging in
//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("Passwords do not match.");
    return next(err);
  }

  if (req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});*/

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Welcome to the secret lair</h1>' + user.username + '<br><a type="button" href="/logout">Logout</a>'+'<br><a type="button" href="/game">PLAY</a>');
        }
      }
    });
});

// GET for logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
// GET for game
router.get('/game', function (req, res, next) {
  if (req.session) {
  res.sendfile(path.join(__dirname, '../skifree/index.html'));
  }
});

module.exports = router;