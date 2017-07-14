// use strict mode
'use strict';

// config. require setting
require.config({
	// config. js modules path
	paths: {
		jquery:     'lib/jquery-3.2.1',
		underscore: 'lib/underscore',
		backbone:   'lib/backbone'
	},

	// config. js modules which don't support AMD
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	}
});

require([
		'backbone',
		'views/app-view'
], function(Backbone, AppView) {
	console.log('load Backbone and AppView');
});