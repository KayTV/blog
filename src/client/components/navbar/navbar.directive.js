angular.module('app')
  .directive('navbar', function(){
    return {
      restrict: 'E',
      templateUrl: 'components/navbar/navbar.html',
      controller: ['$scope', '$location', function($scope, $location){
        $scope.isActive = function(viewLocation){
          return viewLocation===$location.path();
        }
      }]
    };
});
