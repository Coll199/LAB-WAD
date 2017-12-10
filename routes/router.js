var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Score = require('../models/leaderboard');
var path = require('path');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Add Score to DB
router.post('/score', (req, res, next) => {
  let newScore = new Score({
    username: req.body.username,
    score: req.body.score
  });

  Score.addScore(newScore, (err, score) => {
    if(err){
      res.json({msg:'Failed to save score'});
    }else {
      res.json({msg:'Score saved'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  var authUser = {
    username: req.body.username,
    password: req.body.password
  };

  User.getUserByUsername(authUser.username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(authUser.password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(authUser, 'work hard', {
          expiresIn: 604800 // 1 week
        });
        
        res.json({
          success: true,
          token: token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// GET List of Scores
router.get('/scoreList', function (req, res, next) {
  Score.getScores((err,scores)=>{
    if(err){
      res.send(err);
    }else{
      res.json(scores);
    }
  });
});

module.exports = router;
