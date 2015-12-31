(function() {
  'use strict';

  angular.module('app')
  .controller('BlogController', BlogController);

  BlogController.$inject = ['httpfactory', '$scope'];

  function BlogController(httpfactory, $scope) {
    activate();

    function activate() {
      httpfactory.getAllPosts()
        .then(function(response) {
          $scope.blogPosts = response.data;
          console.log($scope.blogPosts);
        })
        .catch(function(err) {
          console.log('error getting all posts', err);
        });
    }
  }

})();
