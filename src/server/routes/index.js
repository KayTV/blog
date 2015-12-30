var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Life of a Galvanize Student'});
});
router.get('/galvanize', function(req, res, next) {
  res.render('galvanize', {title: 'Life of a Galvanize Student'});
});
router.get('/contact', function(req, res, next) {
  res.render('contact', {title: 'Life of a Galvanize Student'});
});
router.get('/newposts', function(req, res, next) {
  res.render('newposts', {title: 'Life of a Galvanize Student'});
});
router.get('/popularposts', function(req, res, next) {
  res.render('popularposts', {title: 'Life of a Galvanize Student'});
});
router.get('/allposts', function(req, res, next) {
  res.render('allposts', {title: 'Life of a Galvanize Student'});
});

module.exports = router;
