'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngSanitize', 'scientificNotation'])
  .controller('floatingPointCtrl', ["$scope", "$sce", "scientificNotation", function($scope, $sce, scientificNotation) {
    $scope.examples = [
      {
        'question' : '24 converted to binary is:',
        'expectedAnswer' : '00011000',
        'jsAnswer' : parseInt(24,10).toString(2)
      },
      {
        'question' : '00011000 converted to decimal is:',
        'expectedAnswer' : '24',
        'jsAnswer' : parseInt('00011000',2).toString(10)
      },
      {
        'question' : '1.0 x 2^3 converted to decimal is:',
        'expectedAnswer' : '8',
        'jsAnswer' : parseInt('1.0', 2).toString(10) * Math.pow(2,3)
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

    $scope.convertFractionToDecimal = function(binaryNumber) {
      $scope.outputDecimalNumber = $scope.convertToDecimalMain(binaryNumber, -1, false);
    }

    $scope.convertScientificBinaryToDecimal = function(scientificBinaryNumber) {
      var scObject = scientificNotation.findScientificNotationComponents(scientificBinaryNumber);
      $scope.convertToDecimal(scObject.integer);
      $scope.outputScientificDecimalNumber = $scope.outputDecimalNumber;
      $scope.convertFractionToDecimal(scObject.fraction);
      $scope.outputScientificDecimalNumber += $scope.outputDecimalNumber;
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
      return (
        ($scope.outputDecimalNumber == localAnswer) || 
        ($scope.outputBinaryNumber == localAnswer) ||
        ($scope.outputScientificDecimalNumber == localAnswer)
      );
    }
  }]);
