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
        controller: 'BlogController',
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
      .when('/new', {
        templateUrl: '../features/newPost/newPost.html',
        controller: 'NewPostController',
        access: {restricted: false}
      })
      .when('/login', {
        templateUrl: '../components/auth/partials/login.html',
        controller: 'LoginController',
        access: {restricted: false}
      })
      .when('/logout', {
        controller: 'LogoutController',
        access: {restricted: true}
      })
      .when('/register', {
        templateUrl: '../components/auth/partials/register.html',
        controller: 'RegisterController',
        access: {restricted: false}
      })
      .otherwise({redirectTo: '/'});
  });
