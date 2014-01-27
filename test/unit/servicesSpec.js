'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));

  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});

describe('scientificNotation', function() {
  beforeEach(module('scientificNotation'));
  var snService;
  beforeEach(inject(function(scientificNotation) {
    snService = scientificNotation;
  }));

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('scientificNotation', function(){
    //inject your service for testing.
    it('should convert scientific notation to an object', function() {
      expect(snService.findScientificNotationComponents('1.0 x 2^0')).toEqualData(
        {
          'integer' : '1',
          'fraction' : '0',
          'exponent' : 0,
          'sign' : '+',
        }
      );
    });

    it('should convert scientific notation to an object', function() {
      expect(snService.findScientificNotationComponents('1.0 x 2^1')).toEqualData(
        {
          'integer' : '1',
          'fraction' : '0',
          'exponent' : 1,
          'sign' : '+',
        }
      );
    });

    it('should convert scientific notation to an object', function() {
      expect(snService.findScientificNotationComponents('1.0000111 x 2^5')).toEqualData(
        {
          'integer' : '100001',
          'fraction' : '11',
          'exponent' : 5,
          'sign' : '+',
        }
      );
    });
    

    it('should convert scientific notation to an object', function() {
      expect(snService.findScientificNotationComponents('1.0 x 2^5')).toEqualData(
        {
          'integer' : '100000',
          'fraction' : '0',
          'exponent' : 5,
          'sign' : '+',
        }
      );
    });

    it('should convert scientific notation to an object', function() {
      expect(snService.findScientificNotationComponents('1.101 x 2^-10')).toEqualData(
        {
          'integer' : '0',
          'fraction' : '0000000001101',
          'exponent' : -10,
          'sign' : '+',
        }
      );
    });

    it('should convert scientific notation to an object', function() {
      expect(snService.findScientificNotationComponents('-1.011 x 2^-3')).toEqualData(
        {
          'integer' : '0',
          'fraction' : '001011',
          'exponent' : -3,
          'sign' : '-'
        }
      );
    });
  });
});
