var express = require('express');
var router = express.Router();
var Post = require('../models/posts');

router.get('/posts', getAllPosts);
router.get('/post/:id', getOnePost);
router.post('/post', createPost);
router.put('/post', updatePost);
router.delete('/post/:id', deletePost);

module.exports = router;

function getAllPosts(req, res) {
  Post.findQ()
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json({
        message: err,
        status: 500
      });
    });
}

function getOnePost(req, res) {
  Post.findByIdQ(req.params.id)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json({
        message: err,
        status: 500
      })
    })
}

function createPost(req, res) {
  new Post(req.body)
    .saveQ()
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json({
        satus: 500,
        message: err
      });
    });
}

function updatePost(req, res) {
  var query = {title: req.body.title};
  var update = req.body;
  var options = {new: true, upsert: true};
  Post.findOneAndUpdateQ(query, update, options)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json({
        message: err,
        status: 500
      });
    });
}

function deletePost(req, res) {
  Post.findByIdAndRemoveQ(req.params.id)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json({
        message: err,
        status: 500
      });
    });
}
