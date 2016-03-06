(function() {
  'use strict';

  angular.module('app').controller('EditController', EditController);

  EditController.$inject = ['$scope', 'httpfactory', '$location'];

  function EditController($scope, httpfactory, $location) {
    var postId = httpfactory.getCurPostId();
    httpfactory.getPost(postId)
      .then(function(response) {
        console.log('edit post', response.data);
        $scope.blogPost = response.data;
      });

    $scope.editPost = editPost;

    function editPost() {
      httpfactory.updatePost($scope.blogPost)
        .then(function(response) {
          console.log('successfully updated');
          $location.path('/blog');
        })
        .catch(function(err) {
          console.log('error updating', err);
        });
    }
  }

})();
