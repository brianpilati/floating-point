'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });


  var scope, ctrl;
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('floatingPointCtrl', { $scope: scope });
  }));

  describe('floatingPointCtrl', function(){
    it('should convert binary to decimal', function() {
      scope.convertToDecimal('00000000');
      expect(scope.outputDecimalNumber).toBe(0);
    });

    it('should convert binary to decimal', function() {
      scope.convertToDecimal('00000001');
      expect(scope.outputDecimalNumber).toBe(1);
    });

    it('should convert binary to decimal', function() {
      scope.convertToDecimal('00000010');
      expect(scope.outputDecimalNumber).toBe(2);
    });

    it('should convert binary to decimal', function() {
      scope.convertToDecimal('00000011');
      expect(scope.outputDecimalNumber).toBe(3);
    });

    it('should convert binary to decimal', function() {
      scope.convertToDecimal('10000011');
      expect(scope.outputDecimalNumber).toBe(131);
    });

    it('should convert binary to decimal', function() {
      scope.convertToDecimal('11111111111111111111111');
      expect(scope.outputDecimalNumber).toBe(8388607);
    });

    it('should convert binary to decimal', function() {
      scope.convertToDecimal('11111111111111111111111111111111');
      expect(scope.outputDecimalNumber).toBe(4294967295);
    });

  });

  describe('floatingPointCtrl', function(){
    it('should convert decimal to binary', function() {
      scope.convertToBinary(0);
      expect(scope.outputBinaryNumber).toBe('00000000');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(1);
      expect(scope.outputBinaryNumber).toBe('00000001');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(2);
      expect(scope.outputBinaryNumber).toBe('00000010');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(12);
      expect(scope.outputBinaryNumber).toBe('00001100');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(45);
      expect(scope.outputBinaryNumber).toBe('00101101');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(255);
      expect(scope.outputBinaryNumber).toBe('11111111');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(257);
      expect(scope.outputBinaryNumber).toBe('0000000100000001');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(16777215);
      expect(scope.outputBinaryNumber).toBe('111111111111111111111111');
    });

    it('should convert decimal to binary', function() {
      scope.convertToBinary(4294967295);
      expect(scope.outputBinaryNumber).toBe('11111111111111111111111111111111');
    });
  });

  describe('floatingPointCtrl', function(){
    it('should convert scientific binary to decimal', function() {
      scope.convertScientificBinaryToDecimal('0.0 x 2^0');
      expect(scope.outputScientificDecimalNumber).toBe(0);
    });

    it('should convert scientific binary to decimal', function() {
      scope.convertScientificBinaryToDecimal('1.0 x 2^0');
      expect(scope.outputScientificDecimalNumber).toBe(1);
    });

    it('should convert scientific binary to decimal', function() {
      scope.convertScientificBinaryToDecimal('1.1 x 2^1');
      expect(scope.outputScientificDecimalNumber).toBe(1.5);
    });

    it('should convert scientific binary to decimal', function() {
      scope.convertScientificBinaryToDecimal('1.111 x 2^1');
      expect(scope.outputScientificDecimalNumber).toBe(1.875);
    });

    it('should convert scientific binary to decimal', function() {
      scope.convertScientificBinaryToDecimal('1.0 x 2^3');
      expect(scope.outputScientificDecimalNumber).toBe(8);
    });

    it('should convert scientific binary to decimal', function() {
      scope.convertScientificBinaryToDecimal('1.1 x 2^2');
      expect(scope.outputScientificDecimalNumber).toBe(3);
    });

    it('should convert scientific binary to decimal', function() {
      scope.convertScientificBinaryToDecimal('1.0000111 x 2^5');
      expect(scope.outputScientificDecimalNumber).toBe(33.75);
    });
  });
});
