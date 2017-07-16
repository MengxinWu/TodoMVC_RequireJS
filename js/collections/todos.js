// define module: 'collections/todos'
define([
		'backbone',
		'backboneLocalstorage',
		'models/todo'
], function(Backbone, Store, Todo) {
	
	// use strict mode
	'use strict';

	// define Backbone Collection: Todos
	var Todos = Backbone.Collection.extend({

		model: Todo,

		localStorage: new Store('todos-backbone'),

		// return Todo items which attribute: 'completed' is true
		completed: function() {
			return this.where({completed: true});
		},

		// return Todo items which attribute: 'completed' is false
		remaining: function() {
			return this.where({completed: false});
		},

		// create order num for new Todo item
		nextOrder: function() {
			return this.length ? this.last().get('order') + 1 : 1;
		},

		// specify order of Collection: Todos
		comparator: 'order'
	});

	// return instantiated Backbone Collection: Todos
	return new Todos();
});