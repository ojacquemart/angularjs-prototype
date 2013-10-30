'use strict';

angular.module('home', [ 'ngRoute' ])
   .config(function ($routeProvider) {
      $routeProvider
         .when('/home', {
            templateUrl: 'app/home/home.tpl.html',
            controller: 'HomeCtrl',
            title: 'HOME.TITLE'
         });
   })
   .controller('HomeCtrl', function ($scope, Config) {
      $scope.awesomeThings = [
         'HTML5 Boilerplate',
         'AngularJS',
         'Karma',
         'LOL'
      ];

      $scope.env = Config.env;
   });
