'use strict';

angular.module('search', [ 'ngRoute' ])
   .config(function ($routeProvider) {
      $routeProvider
         .when('/search', {
            templateUrl: 'app/search/search.tpl.html',
            controller: 'SearchCtrl',
            title: 'SEARCH.TITLE'
         });
   })
   .controller('SearchCtrl', function($scope) {

   })
  .service('Mama', function Mama() {
    return {
       'ok': 'great'
    }
  });
