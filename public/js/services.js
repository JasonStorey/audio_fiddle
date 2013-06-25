'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('audioFiddle.services', [])
	.value('version', '0.1')
  .value('interfaces', {
		keyboard: {
			instrument: 'acoustic_grand_piano',
			program: 0,
			numOfTriggers: 127,
			samples: [
				{
					name: 'A0',
					url: 'sample path',
					trigger: 0,
					note: 50
				},
				{
					name: 'B0',
					url: 'sample path',
					trigger: 1,
					note: 51
				},
				{
					name: 'C0',
					url: 'sample path',
					trigger: 2,
					note: 52
				},
				{
					name: 'D0',
					url: 'sample path',
					trigger: 3,
					note: 53
				},
				{
					name: 'E0',
					url: 'sample path',
					trigger: 4,
					note: 54
				}
			]
		},
		drumkit:{
			instrument: 'synth_drum',
			program: 118,
			numOfTriggers: 12,
			samples: [
				{
					name: 'Kick',
					url: 'sample path',
					trigger: 0,
					note: 50
				},
				{
					name: 'Snare',
					url: 'sample path',
					trigger: 1,
					note: 51
				},
				{
					name: 'HH',
					url: 'sample path',
					trigger: 2,
					note: 52
				},
				{
					name: 'Open HH',
					url: 'sample path',
					trigger: 3,
					note: 53
				},
				{
					name: 'Crash',
					url: 'sample path',
					trigger: 4,
					note: 54
				}
			]
		}
  })
  .factory('MIDI', ['$window', function($window) {
  	var MIDI = $window.MIDI;
  	var _loadPlugin = $window.MIDI.loadPlugin;

  	MIDI.loadPlugin = function(config) {
			console.log(config);
			_loadPlugin(config);
  	};

		MIDI.unloadAllSamples = function () {
	  		var audioElems = document.querySelectorAll('audio');
	  		angular.forEach(audioElems, function(value){
	  			angular.element(value).remove();
	  		});
  	};

  	return MIDI;

  }]);
