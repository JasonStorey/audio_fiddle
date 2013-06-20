'use strict';

/* Directives */


angular.module('audioFiddle.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('musicalInterface', ['instruments', function(instrumentsCollection) {
  	return {
      restrict: 'E',
      replace: false, // Angular bug... 'replace: true' breaks $observe on interpolated $attrs
      transclude: true,
      scope: { instrument:'@instrument' },
      templateUrl: 'templates/musical_interface.html',
      link: function($scope, $element, $attrs) {

      	$scope.instrument;
      	$scope.keys;
      	$scope.instrumentName;

      	$attrs.$observe('instrument', function(instrumentName) {
      		if(instrumentName) {
      			$scope.instrumentName = instrumentName;
      			$scope.instrument = instrumentsCollection[instrumentName];
						initKeys($scope.instrument);
						initSamples($scope.instrument);
      		}
      	});

      	function initSamples(instrument) {
      		var sample;      		
      		for(var i = 0; i < instrument.samples.length; i++) {
      			sample = instrument.samples[i];
      			$scope.keys[sample.key]['sample'] = sample;
      		}
      	}

      	function initKeys(instrument) {
      		var keysArray = [];
					for(var i=0; i < instrument.numOfKeys; i++) {
						keysArray.push({number: i});
					}
					$scope.keys = keysArray;
      	}

      }
    }
  }])
  .directive('noteTrigger', [function() {
  	return {
  		restrict: 'EA',
  		replace: false,
  		link: function($scope, $element, $attrs) {

  			$scope.playSample = function(sample) {
  				if(sample) {
						console.log(sample.url);
  				} else {
  					console.log('no sample set');
  				}
  			};

  		}
  	}
  }]);
