// define module 'routers/router'
define([
		'jquery',
		'backbone',
		'collections/todos',
		'common'
], function($, Backbone, Todos, Common) {

	// use strict mode
	'use strict';

	// define Backbone Router: AppRouter
	var AppRouter = Backbone.Router.extend({

		// routes map URLs with parameters to functions 
		routes: {

			// route of '*filter' match #active and pass 'active' 
			'*filter': 'setFilter'
		},

		// visit '*filter' route and fire route: setFilter event
		setFilter: function(param) {

			// set current filter
			Common.TodoFilter = param || '';

			// trigger Collection event: filter to hide/unhide TodoView
			Todos.trigger('filter');
		}
	});

	// return Backbone Router: AppRouter to define module
	return AppRouter;
});

