(function() {
  'use strict';

  angular.module('app')
  .controller('LogoutController', ['$scope', '$location', 'AuthFactory',
    function ($scope, $location, AuthFactory) {

      $scope.logout = function () {
        console.log(AuthFactory.getUserStatus());
        // call logout from service
        AuthFactory.logout()
          .then(function () {
            $location.path('/login');
          });
      };

  }]);

})();
