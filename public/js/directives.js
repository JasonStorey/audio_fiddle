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
      	$scope.triggers;
      	$scope.instrumentName;
      	$scope.soundfontLoaded = false;
				$scope.$on('$destroy', function() {
					unloadAllSamples();
				});

      	$attrs.$observe('instrument', function(instrumentName) {
      		if(instrumentName) {
      			$scope.instrumentName = instrumentName;
      			$scope.instrument = instrumentsCollection[instrumentName];
						initTriggers($scope.instrument);
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
						}
					});
      	}

      	function unloadAllSamples() {
					MIDI.unloadAllSamples();
					$scope.soundfontLoaded = false;
      	}

      	function initSamples(instrument) {
      		var sample;
      		for(var i = 0; i < instrument.samples.length; i++) {
      			sample = instrument.samples[i];
      			$scope.triggers[sample.trigger]['sample'] = sample;
      		}
      	}

      	function initTriggers(instrument) {
      		var triggersArray = [];
					for(var i=0; i < instrument.numOfTriggers; i++) {
						triggersArray.push({number: i});
					}
					$scope.triggers = triggersArray;
      	}

      }
    }
  }])
  .directive('noteTrigger', ['MIDI', function(MIDI) {
  	return {
  		restrict: 'EA',
  		replace: false,
  		link: function($scope, $element, $attrs) {

  			$scope.playSample = function() {

  				if($scope.trigger.sample) {
						console.log($scope.trigger.sample)

						var delay = 0; // play one note every quarter second
						var note = $scope.trigger.sample.note; // the MIDI note
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
