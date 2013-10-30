'use strict';

angular.module('protoApp', [
      // External modules
      'ngRoute',
      'ngCookies',
      'pascalprecht.translate',
      // Project modules
      'config',
      'home',
      'search'
   ])
   .config(function ($routeProvider, $translateProvider) {

      var setDefaultRoute = function () {
         $routeProvider
            .otherwise({
               redirectTo: '/home'
            });
      };

      var setTranslationConfig = function (defaultLang) {
         $translateProvider.useStaticFilesLoader({
            prefix: 'assets/locale/',
            suffix: '.json'
         });
         $translateProvider.preferredLanguage(defaultLang);
         $translateProvider.useCookieStorage();
      }

      setDefaultRoute();
      setTranslationConfig('en');
   })
   .run(['$rootScope', '$location', '$translate', function ($rootScope, $location, $translate) {
      $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute){
         //Change page title, based on Route information
         $rootScope.title = $translate(currentRoute.$$route.title);
      });
   }])
;
