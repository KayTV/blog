(function() {
  'use strict';

  angular.module('app')
  .controller('RegisterController', ['$scope', '$location', 'AuthFactory',
    function ($scope, $location, AuthFactory) {

      console.log(AuthFactory.getUserStatus());
      $scope.register = function () {
        // initial values
        $scope.error = false;
        $scope.disabled = true;
        // call register from service
        AuthFactory.register($scope.registerForm.username, $scope.registerForm.password)
          // handle success
          .then(function () {
            console.log('successful register');
            $location.path('/');
            $scope.disabled = false;
            $scope.registerForm = {};
          })
          // handle error
          .catch(function (response) {
            console.log('error message', response.err);
            $scope.error = true;
            $scope.errorMessage = response.err.message
            $scope.disabled = false;
            $scope.registerForm = {};
          });
      };



    $scope.githubLogin = function() {
      AuthFactory.githubLogin()
      .then(function() {
        $location.path('/');
      })
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Something went wrong.";
      });
    };

  }]);

})();
