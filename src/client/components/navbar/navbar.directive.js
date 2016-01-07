(function() {
  'use strict';

  angular.module('app').directive('navbar', navbarDirective);

  function navbarDirective() {
    return {
      restrict: 'E',
      templateUrl: 'components/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {}
    };
  }

  navbarController.$inject = ['$location', 'AuthFactory']

  function navbarController($location, AuthFactory) {
    var vm = this;
    vm.isActive = function(viewLocation){
      return viewLocation===$location.path();
    };

    vm.isAdmin = function() {
      return AuthFactory.getAdminStatus();
    }

    vm.isAuthenticated = function() {
      var auth = AuthFactory.getUserStatus();
      if(auth) {
        vm.user = AuthFactory.getUserName();
      }
      return auth;
    };
  }
})();
