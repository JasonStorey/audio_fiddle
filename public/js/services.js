'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('audioFiddle.services', [])
	.value('version', '0.1')
  .value('instruments', {
		keyboard: {
			numOfTriggers: 127,
			samples: [
				{
					name: 'A01',
					url: 'sample path',
					trigger: 0,
					note: 50
				},
				{
					name: 'A02',
					url: 'sample path',
					trigger: 1,
					note: 51
				},
				{
					name: 'A03',
					url: 'sample path',
					trigger: 2,
					note: 52
				},
				{
					name: 'A04',
					url: 'sample path',
					trigger: 3,
					note: 53
				},
				{
					name: 'A05',
					url: 'sample path',
					trigger: 4,
					note: 54
				}
			]
		},
		drumkit:{
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
