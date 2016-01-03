(function() {
  'use strict';

  angular.module('app')
  .factory('AuthFactory', ['$q', '$timeout', '$http',
    function ($q, $timeout, $http) {

      // create user variable
      var user = null;

      // return available functions for use in controllers
      return ({
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register,
        githubLogin: githubLogin
      });

      function getUserStatus() {
        if(user) {
          return true;
        } else {
          return false;
        }
      }

      function login(username, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/local/login', {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              user = true;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });
        // return promise object
        return deferred.promise;
      }

      function logout() {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a get request to the server
        $http.get('/local/logout')
          // handle success
          .success(function (data) {
            user = false;
            $rootScope.user = '';
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });
        // return promise object
        return deferred.promise;
      }

      function register(username, password) {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/local/register', {username: username, password: password})
          // handle success
          .success(function (data, status) {
            console.log('in AuthFactory success');
            if(status === 200 && data.status){
              login(username, password);
              $rootScope.user = username;
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject(data);
          });
        // return promise object
        return deferred.promise;
      }

      function githubLogin() {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/local/login', {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              user = true;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });
        // return promise object
        return deferred.promise;
      }

  }]);

})();
