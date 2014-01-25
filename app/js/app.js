'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view', {templateUrl: 'partials/view.html', controller: 'floatingPointCtrl'});
  $routeProvider.otherwise({redirectTo: '/view'});
}]);
