'use strict';

/* Directives */


angular.module('audioFiddle.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('musicalInterface', ['instruments', 'MIDI', function(instrumentsCollection, MIDI) {
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
      	$scope.soundfontLoaded = false;

      	$attrs.$observe('instrument', function(instrumentName) {
      		if(instrumentName) {
      			$scope.instrumentName = instrumentName;
      			$scope.instrument = instrumentsCollection[instrumentName];
						initKeys($scope.instrument);
						loadSoundfont($scope.instrument);
						initSamples($scope.instrument);
      		}
      	});

      	function loadSoundfont(instrument) {
      		MIDI.loadPlugin({
						soundfontUrl: "soundfonts/",
						instrument: "acoustic_grand_piano",
						callback: function() {
							$scope.soundfontLoaded = true;
							$scope.$on('$destroy', function() {
								MIDI.unloadPlugin("acoustic_grand_piano");
							});
						}
					});
      	}

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
  .directive('noteTrigger', ['MIDI', function(MIDI) {
  	return {
  		restrict: 'EA',
  		replace: false,
  		link: function($scope, $element, $attrs) {

  			$attrs.$observe('sample', function(sample) {
  				$scope.sample = sample;

  			});

  			$scope.playSample = function() {
  				if($scope.sample) {
						var delay = 0; // play one note every quarter second
						var note = 50; // the MIDI note
						var velocity = 127; // how hard the note hits
						// play the note
						MIDI.setVolume(0, 127);
						MIDI.noteOn(0, note, velocity, delay);
						MIDI.noteOff(0, note, delay + 0.75);
  				} else {
  					console.log('no sample set');
  				}
  			};

  		}
  	}
  }]);
