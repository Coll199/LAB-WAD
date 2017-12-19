var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Score = require('../models/leaderboard');
var Game = require('../models/game');
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

// Add Game to DB
router.post('/game', (req, res, next) => {
  let newGame = new Game({
    gid: req.body.gid,
    type: req.body.type
  });
  Game.addGame(newGame, (err, score) => {
    if(err){
      res.json({msg:'Failed to save game'});
    }else {
      res.json({msg:'Game saved'});
    }
  });
});

// Add Score to DB
router.post('/score', (req, res, next) => {
  let newScore = new Score({
    lid: req.body.lid,
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

// GET List of Games
router.get('/gameList', function (req, res, next) {
  Game.getGames((err,games)=>{
    if(err){
      res.send(err);
    }else{
      res.json(games);
    }
  });
});

router.delete('/game/:id', function (req, res, next) {
  Game.removeGameById(req.params.id, (err,games)=>{
    if(err){
      res.send(err);
    }else{
      res.json(games);
    }
  });
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

router.get('/scoreList/:id', function (req, res, next) {
  Score.getScoresById(req.params.id, (err,scores)=>{
    if(err){
      res.send(err);
    }else{
      res.json(scores);
    }
  });
});

module.exports = router;
