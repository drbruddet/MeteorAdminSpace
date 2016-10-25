import { Tasks } from './tasks.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertTask = new ValidatedMethod({
	name: 'tasks.insert',
	validate: new SimpleSchema({
		text: { type: String },
		priority: { type: String },
		listId: { type: String },
		createdAt: { type: Date },
		checked: { type: Boolean }
	}).validator(),
	run(task) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		Tasks.insert(task);
	},
});

export const deleteTask = new ValidatedMethod({
	name: 'tasks.remove',
	validate: new SimpleSchema({
		_id: { type: String },
	}).validator(),
	run({ _id }) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		Tasks.remove(_id);
	},
});

export const updateTask = new ValidatedMethod({
	name: 'tasks.update',
	validate: new SimpleSchema({
		_id: { type: String },
		'update.text': { type: String, optional: false },
		'update.priority': { type: String, optional: true },
	}).validator(),
	run({ _id, update }) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		return Tasks.update(_id, { $set: update });
	},
});

export const setChecked = new ValidatedMethod({
	name: 'tasks.setChecked',
	validate: new SimpleSchema({
		_id: { type: String },
		setChecked: { type: Boolean }
	}).validator(),
	run({ _id, setChecked }) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		Tasks.update( _id, { $set: { checked: setChecked} });
	},
});