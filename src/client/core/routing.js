angular.module('app', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: '../features/home/home.html',
        controller: 'HomeController',
        access: {restricted: false}
      })
      .when('/blog', {
        templateUrl: '../features/blog/blog.html',
        // controller: 'HomeController',
        access: {restricted: false}
      })
      .when('/contact', {
        templateUrl: '../features/contact/contact.html',
        // controller: 'HomeController',
        access: {restricted: false}
      })
      .when('/galvanize', {
        templateUrl: '../features/galvanize/galvanize.html',
        // controller: 'HomeController',
        access: {restricted: false}
      })
      .when('/login', {
        templateUrl: 'auth/partials/login.html',
        controller: 'LoginController',
        access: {restricted: false}
      })
      .when('/logout', {
        controller: 'LogoutController',
        access: {restricted: true}
      })
      .when('/register', {
        templateUrl: 'auth/partials/register.html',
        controller: 'RegisterController',
        access: {restricted: false}
      })
      .otherwise({redirectTo: '/'});
  });
