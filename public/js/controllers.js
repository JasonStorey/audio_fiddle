'use strict';

/* Controllers */

angular.module('audioFiddle.controllers', []).
  controller('MyCtrl1', ['$scope', '$timeout', function($scope, $timeout) {
  	$scope.layout = "keyboard";
  	$timeout(function() {
  		$scope.layout = "drumkit";
  	}, 500);
  }])
  .controller('MyCtrl2', [function() {

  }]);