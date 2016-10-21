import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	Meteor.publish('tasks', function tasksPublication() {
		return Tasks.find();
	});
}

Meteor.methods({

	'tasks.insert'(text, priority, listId) {
		check(text, String);
		check(priority, String);
		check(listId, String);

		try {
			if (!this.userId)
				throw new Meteor.Error('500', 'Must be logged in to add new tasks.');
			
			Tasks.insert({
				text,
				priority,
				createdAt: new Date(),
				checked: false,
				listId: listId,
				owner: this.userId
			});
		} catch (exception) {
			throw new Meteor.Error('500', exception.message);
		}
	},

	'tasks.remove'(taskId) {
		check(taskId, String);
 
		try {
			const task = Tasks.findOne(taskId);
			if (task.owner !== this.userId)
				throw new Meteor.Error('500', 'Must own the task to delete.');
			Tasks.remove(taskId);
		} catch (exception) {
			throw new Meteor.Error('500', exception.message);
		}
	},

	'tasks.updateTask'(taskId, text, priority) {
		check(taskId, String);
		check(text, String);
		check(priority, String);

		try {
			const task = Tasks.findOne(taskId);
			if (task.owner !== this.userId)
				throw new Meteor.Error('500', 'Must own the task to update.');
			return Tasks.update(taskId, {$set: {'text': text, 'priority': priority}});
		} catch (exception) {
			throw new Meteor.Error('500', exception.message);
		}
	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);
 
		try {
			const task = Tasks.findOne(taskId);
			if (task.owner !== this.userId)
				throw new Meteor.Error('500', 'Must own the task to do this action.');
			Tasks.update(taskId, { $set: { checked: setChecked} });
		} catch (exception) {
			throw new Meteor.Error('500', exception.message);
		}
	},

});

Tasks.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

var Schemas = {};

Schemas.Tasks = new SimpleSchema({
    text: {
        type: String,
        label: "Text",
        max: 300
    },
    priority: {
        type: String,
        label: "Priority"
    },
    createdAt: {
        type: Date,
        label: "Creation Date"
    },
    owner: {
        type: String,
        label: "Owner ID"
    },
    listId: {
		type: String,
	},
    checked: {
    	type: Boolean,
    	label: "Task is Done"
    }
});
Tasks.attachSchema(Schemas.Tasks);