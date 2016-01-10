angular.module('app', ['ngRoute', 'textAngular'])
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
        access: {restricted: false}
      })
      .when('/galvanize', {
        templateUrl: '../features/galvanize/galvanize.html',
        access: {restricted: false}
      })
      .when('/new', {
        templateUrl: '../features/newPost/newPost.html',
        controller: 'NewPostController',
        access: {restricted: true}
      })
      .when('/edit', {
        templateUrl: '../features/editPost/editPost.html',
        controller: 'EditController',
        access: {restricted: true}
      })
      .when('/post', {
        templateUrl: '../features/post/post.html',
        controller: 'PostController',
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

  angular.module('app')
  .run(function ($rootScope, $location, $route, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      console.log('next.access', next.access);
      if (next.access.restricted && !AuthFactory.getUserStatus()) {
        $location.path('/login');
        $route.reload();
      }
    });
  });
