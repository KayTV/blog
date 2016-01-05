var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users.js');
var init = require('../auth/init');

// local auth
router.post('/register', function(req, res) {
  var user = { username: req.body.username };
  if (user.username === 'Kaylyn') {
    user.admin = true;
  };
  User.register(new User(user), req.body.password, function(err, account) {
    if (err) {
      return res.status(500)
                .json({
                  err: err
                });
    }
    passport.authenticate('local')(req, res, function () {
      console.log('SESSION',req.session);
      var user = req.session.passport.user;
      req.login(user, function (err) {
                if(!err){
                    res.redirect('/account');
                }else{
                    //handle error
                }
            })
      return res.status(200)
                .json({
                  status: 'Registration successful!',
                  user: user
                });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json(
        {
          status: 'Login successful!',
          username: user.username,
          admin: user.admin
        }
      );
    });
  })(req, res, next);
});


router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;
