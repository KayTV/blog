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
    $scope.deletePost = deletePost;

    function isAdmin() {
      return AuthFactory.getAdminStatus();
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
  }

})();
