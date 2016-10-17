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

	'tasks.insert'(text, priority) {
		check(text, String);
		check(priority, String);
 
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}
 
		Tasks.insert({
			text,
			priority,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},

	'tasks.remove'(taskId) {
		check(taskId, String);
 
		Tasks.remove(taskId);
	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);
 
		Tasks.update(taskId, { $set: { checked: setChecked } });
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