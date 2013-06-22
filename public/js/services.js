'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('audioFiddle.services', [])
	.value('version', '0.1')
  .value('instruments', {
		keyboard: {
			numOfKeys: 127,
			samples: [
				{
					name: 'A01',
					url: 'sample path',
					key: 0
				},
				{
					name: 'A02',
					url: 'sample path',
					key: 1
				},
				{
					name: 'A03',
					url: 'sample path',
					key: 2
				},
				{
					name: 'A04',
					url: 'sample path',
					key: 3
				},
				{
					name: 'A05',
					url: 'sample path',
					key: 4
				}
			]
		},
		drumkit:{
			numOfKeys: 12,
			samples: [
				{
					name: 'Kick',
					url: 'sample path',
					key: 0
				},
				{
					name: 'Snare',
					url: 'sample path',
					key: 1
				},
				{
					name: 'HH',
					url: 'sample path',
					key: 2
				},
				{
					name: 'Open HH',
					url: 'sample path',
					key: 3
				},
				{
					name: 'Crash',
					url: 'sample path',
					key: 4
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

		MIDI.unloadPlugin = function (plugin) {
	  		var audioElems = document.getElementsByTagName('audio');
	  		angular.forEach(audioElems, function(value){
	  			angular.element(value).remove();
	  		});
  	};

  	return MIDI;

  }]);
