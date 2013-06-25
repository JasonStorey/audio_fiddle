'use strict';

/* Controllers */

angular.module('audioFiddle.controllers', []).
  controller('MyCtrl1', ['$scope', '$timeout', function($scope, $timeout) {
  	//$scope.interfaceStyle = "keyboard";
  	$timeout(function() {
  		$scope.interfaceStyle = "drumkit";
  	}, 500);
  }])
  .controller('MyCtrl2', [function() {

  }]);