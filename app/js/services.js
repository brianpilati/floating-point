'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

var scientificNotation = angular.module('scientificNotation', []);

scientificNotation.factory('scientificNotation', [function() {
  return {
    findScientificNotationComponents: function(scientificNumber) {
      if (! scientificNumber.match(/^\-/)) {
        scientificNumber = "+" + scientificNumber;

      }
      var scientificNotation = scientificNumber.match(/^(\+|-)(\d\.\d+)\s+?x\s+?2\^((-?)(\d+))/);
      var significand = scientificNotation[2].replace(/\./, '');
      var significandLength = significand.length;
      var exponent = parseInt(scientificNotation[3]);
      var exponentAbs = Math.abs(exponent);
      var integer = "";
      var fraction = "";
      if (exponent < 0) {
        for(var index=0; index<exponentAbs; index++) {
          significand = "0" + significand;
        }
        significandLength = significand.length;

      } else {
        if (exponentAbs > significandLength) {
          for(var index=significandLength; index<exponentAbs+2; index++) {
            significand += "0";
          }
          significandLength = significand.length;
        }
      }

      var integerSlice = (exponent < 2 ? 1 : (exponentAbs + 1));
      var integer = significand.slice(0,integerSlice);
      var fraction = significand.slice(integerSlice, significandLength);

      var scientificNotationObject = {
        'integer' : integer,
        'fraction' : fraction,
        'exponent' : exponent,
        'sign' : scientificNotation[1],
      };
      return scientificNotationObject;
    }
  }
}]);
