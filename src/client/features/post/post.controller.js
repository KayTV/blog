(function() {
  'use strict';

  angular.module('app')
    .controller('PostController', PostController);

  PostController.$inject = ['$scope', 'httpfactory', 'AuthFactory'];

  function PostController($scope, httpfactory, AuthFactory) {

    var id = httpfactory.getCurPostId();
    httpfactory.getPost(id)
    .then(function(response) {
      console.log('post', response.data);
      $scope.post = response.data;
    });

    $scope.isAdmin = isAdmin;
    $scope.isAuthenticated = isAuthenticated;
    $scope.deletePost = deletePost;
    $scope.addComment = addComment;

    function isAdmin() {
      return AuthFactory.getAdminStatus();
    }

    function isAuthenticated() {
      return AuthFactory.getUserStatus();
    }

    function deletePost() {
      httpfactory.deletePost(id)
        .then(function(response) {
          console.log('DELETED');
        })
        .catch(function(err) {
          console.log('Wasn\'t deleted.', err);
        })
    }

    function addComment() {
      console.log('COMMENT', $scope.newComment);
      $scope.post.comments.push({
        comment: $scope.newComment,
        createDate: Date.now(),
        author: $scope.author
      });
      httpfactory.updatePost($scope.post)
        .then( function(response) {
          $scope.newComment = '';
          console.log('updated post comment', response);
        })
    }
  }

})();
