'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngSanitize']).
  controller('scientificNotation', ["$scope", "$rootScope", function($scope, $rootScope) {
    $scope.convert = function(inputNumber) {
      console.log("inputNumber: " + inputNumber);
      console.log("rootScope: " + $rootScope.inputBinaryNumber);
      console.log($rootScope);
      console.log();
    }
  }])
  .controller('floatingPointCtrl', ["$scope", "$sce", function($scope, $sce) {
    $scope.examples = [
      {
        'question' : '24 converted to binary is:',
        'expectedAnswer' : '00011000',
        'jsAnswer' : parseInt(24,10).toString(2)
      },
      {
        'question' : '0.1 + 0.2',
        'expectedAnswer' : '0.3',
        'jsAnswer' : 0.1 + 0.2
      },
      {
        'question' : '0.1 + 0.4',
        'expectedAnswer' : '0.5',
        'jsAnswer' : 0.1 + 0.4
      },
      {
        'question' : $sce.trustAsHtml("e^&#960; - &#960;"),
        'expectedAnswer' : '19.999099979',
        'jsAnswer' : Math.pow(Math.E, Math.PI) - Math.PI
      },
      {
        'question' : '.5 + .25',
        'expectedAnswer' : '.75',
        'jsAnswer' : .5 + .25
      }

    ];

    $scope.convertToDecimalMain = function(binaryNumber, exponent, increment) {
      var binaryNumberArray = String(binaryNumber).split('');
      var convertedNumber = 0;
      for(var index = binaryNumberArray.length - 1; index > -1; index--) {
        convertedNumber += binaryNumberArray[index] * Math.pow(2, (increment ? exponent++ : exponent--));
      }
      return convertedNumber;
    }

    $scope.convertToDecimal = function(binaryNumber) {
      $scope.outputDecimalNumber = $scope.convertToDecimalMain(binaryNumber, 0, true);
    }

    $scope.findScientificNotationComponents = function(scientificNumber) {
      if (! scientificNumber.match(/^\-/)) {
        scientificNumber = "+" + scientificNumber;

      }
      var scientificNotation = scientificNumber.match(/^(\+|-)(\d\.\d+)\s+?x\s+?2\^((-?)(\d+))/);
      var scientificNotationObject = {
        'significand' : scientificNotation[2],
        'exponent' : scientificNotation[3],
        'sign' : scientificNotation[1],
      };
      return scientificNotationObject;
    }

    $scope.convertScientificBinaryToDecimal = function(scientificBinaryNumber) {
      var scObject = $scope.findScientificNotationComponents(scientificBinaryNumber);
      return scObject.significand * Math.pow(2,scObject.exponent);
    }

    $scope.convertToBinary = function(decimalNumber) {
      var binaryNumberCollection = [];
      var counter = 32;
      var startPushing = false;
      while (counter > 0) {
        if (decimalNumber - Math.pow(2, counter) >= 0) {
          decimalNumber -= Math.pow(2, counter);
          binaryNumberCollection.push(1);
          startPushing = true;
        } else {
          if (startPushing) {
            binaryNumberCollection.push(0);
          }
        }
        counter--;
      }

      binaryNumberCollection.push(decimalNumber);
      var fillerDigits = binaryNumberCollection.length;
      var upperFiller = (fillerDigits > 24 ? 32 : fillerDigits > 16 ? 24 : fillerDigits > 8 ? 16 : 8);
      for (var index=0; index < upperFiller - fillerDigits; index++) {
        binaryNumberCollection.unshift(0);
      }
      
      $scope.outputBinaryNumber = binaryNumberCollection.join('');
    }

    $scope.useBinaryAnswer = function() {
      $scope.inputDecimalNumber = $scope.outputDecimalNumber;
    }

    $scope.useDecimalAnswer = function() {
      $scope.inputBinaryNumber = $scope.outputBinaryNumber;
    }

    $scope.isCorrect = function(localAnswer) {
      return (($scope.outputDecimalNumber == localAnswer) || ($scope.outputBinaryNumber == localAnswer));
    }
  }]);
