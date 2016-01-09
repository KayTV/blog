(function() {
  'use strict';

  angular.module('app')
  .factory('httpfactory', ['$http', function($http) {

    var factory = {};
    var postId = null;

    factory.getAllPosts = function() {
      return $http.get('/api/posts');
    }

    factory.getPost = function(id) {
      return $http.get('/api/post/'+id);
    }

    // FIXME: poor use of this factory, need a different way to pass between features
    // probably another factory
    factory.getCurPostId = function() {
      return postId;
    }

    factory.setCurPostId = function(id) {
      postId = id;
      console.log('postId', postId);
      return postId;
    }

    factory.createPost = function(blogPost) {
      return $http({
        method: 'POST',
        url: '/api/post',
        data: blogPost
      });
    }

    factory.updatePost = function(blogPost) {
      return $http({
        method: 'PUT',
        url: '/api/post',
        data: blogPost
      });
    }

    factory.deletePost = function(id) {
      return $http({
        method: 'DELETE',
        url: '/api/post/'+id
      });
    }

    return factory;
  }]);

})();
