// define module: 'views/todo-view'
define([
		'jquery',
		'underscore',
		'backbone',
		'text!templates/todo.html',
		'common'
], function($, _, Backbone, todoTemplate, Common) {

	// use strict mode
	'use strict';

	// define Backbone View: TodoView
	var TodoView = Backbone.View.extend({
		tagName: 'li',

		// cache template
		template: _.template(todoTemplate),

		// dpecify DOM events
		events: {
			'click .toggle':    'toggleCompleted',
			'dblclick label':   'edit',
			'click .destroy':   'clear',
			'keypress .edit':   'updateOnEnter',
			'keydown .edit':    'revertOnEscape',
			'blur .edit':       'close'
		},

		initialize: function() {
			// TodoView listen to model event: 'change' to call render()
			this.listenTo(this.model, 'change', this.render);

			// TodoView listen to model event: 'destroy' to call view.remove()
			this.listenTo(this.model, 'destroy', this.remove);

			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			// toggle class: 'completed' depend on Todo item completed status
			this.$el.toggleClass('completed', this.model.get('completed'));

			// call toggleVisible()[custom] to hide view
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},

		toggleVisible: function() {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function() {
			var isCompleted = this.model.get('completed');
			return (
					(!isCompleted && Common.TodoFilter === 'completed') || 
					(isCompleted && Common.TodoFilter === 'active')
				);
		},

		// toggle Todo item completed status by click checkbox(.toggle)
		toggleCompleted: function() {

			// call model.toggle()[custom] to toggle completed status
			this.model.toggle();
		},

		// edit Todo item by dblclick label
		edit: function() {

			// open edit mode
			this.$el.addClass('editing');
			this.$input.focus();
		},

		// clear the model by click the button(.destroy)
		clear: function() {

			// call model.destroy() to destroy the model
			// and trigger model event: 'destroy'
			this.model.destroy();
		},

		// update Todo item by enter ENTER_KEY in the input(.edit)
		updateOnEnter: function(e) {
			if(e.which === Common.ENTER_KEY) {
				this.close();
			}
		},

		close: function() {
			var trimmedValue = this.$input.val().trim();

			if(trimmedValue) {

				// call model.save() to save the model
				// and trigger model event: change
				this.model.save({title: trimmedValue});
			} else {

				// clear Todo item
				this.clear();
			}

			// close edit mode
			this.$el.removeClass('editing');
		},

		// quit edit mode by enter ESCAPE_KEY in the input(.edit)
		revertOnEscape: function(e) {
			if(e.which === Common.ESCAPE_KEY) {

				// close edit mode
				this.$el.removeClass('editing');

				// call model.get(attr) to get the value of attribute
				this.$input.val(this.model.get('title'));
			}
		}

	});

	// return Backbone View: TodoView
	return TodoView;
});

