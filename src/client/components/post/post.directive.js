(function() {
  'use strict';

  angular.module('app').directive('post', postDirective);

  function postDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/post/post.html',
      scope: {
        title: '@',
        body: '@',
        time: '@',
        description: '@',
        blogId: '@'
      },
      controller: postController,
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    };
  }

  postController.$inject = ['httpfactory'];

  function postController(httpfactory) {
    var vm = this;

    vm.setCurPostId = function() {
      console.log('BLOG ID:',vm.blogId);
      httpfactory.setCurPostId(vm.blogId);
    }
  }
})();
