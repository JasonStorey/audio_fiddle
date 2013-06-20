'use strict';

/* Controllers */

angular.module('audioFiddle.controllers', []).
  controller('MyCtrl1', ['$scope', '$timeout', function($scope, $timeout) {
  	$scope.instrumentName = "keyboard";
  	$timeout(function() {
  		$scope.instrumentName = "drumkit";
  	}, 500);
  }])
  .controller('MyCtrl2', [function() {

  }]);