'use strict';

/* Directives */


angular.module('audioFiddle.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('musicalInterface', [function() {
  	return {
      restrict: 'E',
      replace: false, // Angular bug... replace: true breaks $observe on interpolated $attrs
      transclude: true,
      scope: { instrument:'@instrument' },
      templateUrl: 'templates/musical_interface.html',
      link: function($scope, $element, $attrs) {
      	var INSTRUMENTS = {
      				keyboard: {
      					numOfKeys: 127
      				},
      				drumkit:{
      					numOfKeys: 12
      				}
      	};

      	$attrs.$observe('instrument', function(instrument) {
      		if(instrument) {
						console.log(INSTRUMENTS[instrument].numOfKeys);
						var keysArray = []
						for(var i=0; i<INSTRUMENTS[instrument].numOfKeys; i++) {
							keysArray.push('note ' + i);
						}
						$scope.keys = keysArray;
      		}
      	});
      }
    }
  }]);
