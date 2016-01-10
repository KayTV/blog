(function() {
  'use strict';

  angular.module('app').controller('EditController', EditController);

  EditController.$inject = ['$scope', 'httpfactory'];

  function EditController($scope, httpfactory) {
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
        })
        .catch(function(err) {
          console.log('error updating', err);
        });
    }
  }

})();
