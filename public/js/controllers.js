'use strict';

/* Controllers */

angular.module('audioFiddle.controllers', []).
  controller('MyCtrl1', ['$scope', '$timeout', function($scope, $timeout) {
  	$scope.instrument = "keyboard";
  	$timeout(function() {
  		$scope.instrument = "drumkit";
  	}, 500);
  }])
  .controller('MyCtrl2', [function() {

  }]);