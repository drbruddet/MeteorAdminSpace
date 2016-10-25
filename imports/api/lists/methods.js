import { Lists } from './lists.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Tasks } from '../tasks/tasks.js';

export const insertList = new ValidatedMethod({
	name: 'lists.insert',
	validate: new SimpleSchema({
		name: { type: String },
		createdAt: { type: Date },
	}).validator(),
	run(list) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		return Lists.insert(list);
	},
});

export const deleteList = new ValidatedMethod({
	name: 'lists.remove',
	validate: new SimpleSchema({
		_id: { type: String },
	}).validator(),
	run({ _id }) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		Tasks.remove({ "listId": _id });
		Lists.remove(_id);
	},
});

export const updateList = new ValidatedMethod({
	name: 'lists.update',
	validate: new SimpleSchema({
		_id: { type: String },
		'update.name': { type: String, optional: false },
	}).validator(),
	run({ _id, update }) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		Lists.update(_id, { $set: update });
	},
});
