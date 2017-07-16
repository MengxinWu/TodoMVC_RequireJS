// define module: 'models/todo'
define([
		'backbone'
], function(Backbone) {
	
	// use strict mode
	'use strict';

	// define Backbone Model: Todo
	var Todo = Backbone.Model.extend({
		
		// set Model: Todo default attributes
		defaults: {
			title: '',
			completed: false
		},

		// toggle Todo item completed status
		toggle: function() {

			// call model.save() to save the model
			// and trigger model event: change
			this.save({completed: !this.get('completed')});
		}
	});

	// return Backbone Model: Todo
	return Todo;
});