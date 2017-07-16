// use strict mode
'use strict';


// config. require setting
require.config({

	// config. js modules path
	paths: {
		jquery:                 'lib/jquery-3.2.1',
		underscore:             'lib/underscore',
		backbone:               'lib/backbone',
		backboneLocalstorage:   'lib/backbone.localStorage',
		text:                   'lib/text'
	},

	// use shim config for non-AMD scripts that do not use define()
	// RequireJS use shim config to load non-AMD scripts and give local 
	// reference to this module
	shim: {

		underscore: {

			// use global '_' as module value
			exports: '_'
		},

		backbone: {

			// dependencies should be load before loading backbone.js
			deps: [
				'underscore',
				'jquery'
			],

			// use global 'Backbone' as module value
			exports: 'Backbone'
		}
	}
});

// dependencies: Backbone, AppView, AppRouter
require([
		'backbone',
		'views/app-view',
		'routers/router'
], function(Backbone, AppView, AppRouter) {

	// initialize Backbone Router: AppRouter and start Backbone history
	new AppRouter();

	// begin to monitor hashchange events and dispatch routes
	Backbone.history.start();

	// initialize Backbone View: AppView to start program
	new AppView();
});