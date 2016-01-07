(function() {
  'use strict';

  angular.module('app').directive('post', postDirective);

  function postDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/post/post.html',
      controller: postController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        title: '@',
        body: '@',
        time: '@',
        blogID: '@'
      }
    };
  }

  postController.$inject = [];

  function postController() {
    var vm = this;
  }
})();
