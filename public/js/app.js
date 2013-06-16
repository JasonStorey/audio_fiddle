'use strict';

// Declare app level module which depends on filters, and services
angular.module('audioFiddle', ['audioFiddle.filters', 'audioFiddle.services', 'audioFiddle.directives', 'audioFiddle.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  	$locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
