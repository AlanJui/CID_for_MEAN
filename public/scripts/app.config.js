'use strict';

angular.module('myApp')

  // .value('API_URL', 'http://localhost:3000/api')

  .config(function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('jobs', {
        url: '/jobs',
        templateUrl: '/views/jobs.html',
        controller: 'JobsCtrl',
        controllerAs: 'vm'
      })

      .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'ctrl'
      })

      .state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
      })

      .state('main', {
        url: '/',
        templateUrl: '/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });

  });

