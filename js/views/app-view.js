// define module: 'views/app-view'
define([
		'jquery',
		'underscore',
		'backbone',
		'collections/todos',
		'views/todo-view',
		'text!templates/stats.html',
		'common'
], function($, _, Backbone, Todos, TodoView, statsTemplate, Common) {

	// use strict mode
	'use strict';

	// define Backbone View: AppView
	var AppView = Backbone.View.extend({
		el: '#todoapp',

		template: _.template(statsTemplate),

		events: {
			'keypress #new-todo':     'createOnEnter',
			'click #toggle-all':      'toggleAllComplete',
			'click #clear-completed': 'clearCompleted' 
		},

		initialize: function() {
			this.$input = this.$('#new-todo');
			this.$main = this.$('#main');
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$todoList = this.$('#todo-list');
			this.$footer = this.$('#footer');

			// AppView listen to collection event: 'add' to call addOne()
			this.listenTo(Todos, 'add', this.addOne);
			this.listenTo(Todos, 'reset', this.addAll);

			// ????? event: 'change' is belong to model
			this.listenTo(Todos, 'change:completed', this.filterOne);
			this.listenTo(Todos, 'filter', this.filterAll);

			this.listenTo(Todos, 'all', _.debounce(this.render));

			Todos.fetch({reset: true});
		},

		render: function() {
			var completed = Todos.completed().length;
			var remaining = Todos.remaining().length;

			if(Todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.template({
					completed: completed,
					remaining: remaining
				}));
				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (Common.TodoFilter || '') + '"]')
					.addClass('selected');

			} else {
				this.$main.hide();
				this.$footer.hide();
			}
			this.allCheckbox.checked = !remaining;
		},

		// create new TodoView for new Todo item
		addOne: function(todo) {

			// call new view({model: Model}) to create a new view and pass model 
			var todoView = new TodoView({model: todo});
			this.$todoList.append(todoView.render().el);
		},

		addAll: function() {
			this.$todoList.empty();
			Todos.each(this.addOne, this);
		},

		filterOne: function(todo) {
			todo.trigger('visible');
		},

		filterAll: function() {
			Todos.each(this.filterOne, this);
		},

		// create new Todo item by enter ENTER_KEY in the input(#new-todo)
		createOnEnter: function(e) {
			if(e.which === Common.ENTER_KEY && this.$input.val().trim()) {

				// call collection.create() to create new instance of model(Todo)
				// and trigger collection event: 'add'
				Todos.create({
					title: this.$input.val().trim(),
					order: Todos.nextOrder(),
					completed: false
				});

				// clear input(#new-todo) content
				this.$input.val('');
			}
		},

		// toggle all Todo items completed status by click checkbox(#toggle-all)
		toggleAllComplete: function() {
			var completed = this.allCheckbox.checked;

			// call model.save() to save the model 
			// and trigger model event: 'change'
			Todos.each(function(todo) {
				todo.save({completed: completed});
			});
		},

		// clear Todo items completed by click button(.clearCompleted)
		clearCompleted: function() {

			// call model.destroy() to destroy the model
			// and trigger model event: 'destroy' 
			_.invoke(Todos.completed(), 'destroy');

			// ?????: why return false
			return false;
		}

	});

	// return Backbone View: AppView
	return AppView;
});

