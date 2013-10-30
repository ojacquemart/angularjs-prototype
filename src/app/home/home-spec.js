'use strict';

describe('Compoment home', function () {

  // load the controller's module
  beforeEach(module('home'));

  var homeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    homeCtrl = $controller('HomeCtrl', {
      $scope: scope,
      Config: {
         'env': {
            'name': 'foo'
         }
      }
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(4);
  });
});
