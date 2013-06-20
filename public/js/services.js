'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('audioFiddle.services', []).
  value('version', '0.1')
  .value('instruments', {
		keyboard: {
			numOfKeys: 127
		},
		drumkit:{
			numOfKeys: 12
		}
  });
