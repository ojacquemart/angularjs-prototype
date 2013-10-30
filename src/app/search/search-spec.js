'use strict';

describe('Module : search', function () {

  // load the service's module
  beforeEach(module('search'));

  // instantiate service
  var mama;
  beforeEach(inject(function (_Mama_) {
    mama = _Mama_;
  }));

  it('should do something', function () {
    expect(mama.ok).toBe('great');
  });

});
