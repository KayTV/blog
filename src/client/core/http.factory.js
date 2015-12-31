(function() {
  'use strict';

  angular.module('app')
  .factory('httpfactory', ['$http', function($http) {
    var factory = {};

    factory.getAllPosts = function() {
      return $http.get('/api/posts');
    }

    factory.getPost = function(id) {
      return $http.get('/api/post/'+id);
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
