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
      replace: true,
      transclude: false,
      scope: { layout:'@layout' },
      template: '<div>' +
                  '<div class="title">{{layout}}</div>' +
                  '<div></div>' +
                '</div>',
      link: function($scope, $element, $attrs) {
      	var LAYOUTS = {
      				keyboard: {
      					keys: 127
      				},
      				drumkit:{
      					keys: 12
      				}
      	};
      	$attrs.$observe('layout', function(val) {
					console.log(LAYOUTS[val].keys);
      	});
      }
    }
  }]);
