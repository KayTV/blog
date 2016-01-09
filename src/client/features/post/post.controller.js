(function() {
  'use strict';

  angular.module('app')
    .controller('PostController', PostController);

  PostController.$inject = ['$scope', 'httpfactory'];

  function PostController($scope, httpfactory) {
    var id = httpfactory.getCurPostId();
    httpfactory.getPost(id)
    .then(function(response) {
      console.log('post', response.data);
      $scope.post = response.data;
    });
  }

})();
