angular.module('app')
  .directive('navbar', function(){
    return {
      restrict: 'E',
      templateUrl: 'components/navbar/navbar.html',
      controller: ['$scope', '$location', 'AuthFactory', function($scope, $location, AuthFactory){
        $scope.isActive = function(viewLocation){
          return viewLocation===$location.path();
        };

        $scope.isAdmin = function() {
          return AuthFactory.getAdminStatus();
        }

        $scope.isAuthenticated = function() {
          var auth = AuthFactory.getUserStatus();
          if(auth) {
            $scope.user = AuthFactory.getUserName();
          }
          return auth;
        };
      }]
    };
});
