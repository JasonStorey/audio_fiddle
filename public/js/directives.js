'use strict';

/* Directives */


angular.module('audioFiddle.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('musicalInterface', ['interfaces', 'MIDI', function(interfaces, MIDI) {
  	return {
      restrict: 'E',
      replace: false, // Angular bug... 'replace: true' breaks $observe on interpolated $attrs
      transclude: true,
      scope: { interfaceStyle:'@interfaceStyle' },
      templateUrl: 'templates/musical_interface.html',
      link: function($scope, $element, $attrs) {

      	$scope.interfaceStyle;
      	$scope.triggers;
      	$scope.instrumentName;
      	$scope.soundfontLoaded = false;
				$scope.$on('$destroy', function() {
					unloadAllSamples();
				});

      	$attrs.$observe('interfaceStyle', function(interfaceStyle) {
      		if(interfaceStyle) {
      			$scope.interfaceStyle = interfaceStyle;
      			$scope.musicalInterface = interfaces[interfaceStyle];
						initTriggers($scope.musicalInterface);
						loadSoundfont($scope.musicalInterface);
						initSamples($scope.musicalInterface);
      		}
      	});

      	function loadSoundfont(musicalInterface) {
      		MIDI.loadPlugin({
						soundfontUrl: "soundfonts/",
						instrument: musicalInterface.instrument,
						callback: function() {
							MIDI.programChange(0, musicalInterface.program)
							$scope.soundfontLoaded = true;
						}
					});
      	}

      	function unloadAllSamples() {
					MIDI.unloadAllSamples();
					$scope.soundfontLoaded = false;
      	}

      	function initSamples(musicalInterface) {
      		var sample;
      		for(var i = 0; i < musicalInterface.samples.length; i++) {
      			sample = musicalInterface.samples[i];
      			$scope.triggers[sample.trigger]['sample'] = sample;
      		}
      	}

      	function initTriggers(musicalInterface) {
      		var triggersArray = [];
					for(var i=0; i < musicalInterface.numOfTriggers; i++) {
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
