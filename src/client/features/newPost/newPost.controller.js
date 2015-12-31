(function() {
  'use strict';

  angular.module('app')
  .controller('NewPostController', NewPostController);

  NewPostController.$inject = ['$scope', 'httpfactory'];

  function NewPostController($scope, httpfactory){
    $scope.createPost = createPost;

    function createPost() {
      var blogPost = {
        title: $scope.title,
        createDate: Date.now(),
        post: $scope.post
      };
      console.log(blogPost);
      httpfactory.createPost(blogPost)
        .then(function(response) {
          console.log('successfully created post', response);
        }).catch(function(err) {
          console.log('failed to create post', err);
        });
      $scope.title='';
      $scope.post='';
    }
  }

})();
