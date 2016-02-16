(function() {
  'use strict';

  angular.module('app')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['httpfactory', '$scope'];

  function HomeController(httpfactory, $scope) {
    activate();

    function activate() {
      httpfactory.getAllPosts()
        .then(function(response) {
          console.log(response);
          var allPosts = response.data;
          $scope.blogPosts = [];
          for (var i=0; i<3; i++) {
            var index = Math.floor(Math.random() * allPosts.length);
            $scope.blogPosts.push(allPosts.splice(index, 1)[0]);
          }
          console.log($scope.blogPosts);
        })
        .catch(function(err) {
          console.log('error getting all posts', err);
        });
    }
  }

})();
