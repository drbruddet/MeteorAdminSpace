import { Operations } from './operations.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertOperation = new ValidatedMethod({
	name: 'operations.insert',
	validate: new SimpleSchema({
		name: { type: String },
		description: { type: String },
		amount: { type: Number },
		type: { type: String },
		frequency: { type: String },
		createdAt: { type: Date },
	}).validator(),
	run(operation) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		return Operations.insert(operation);
	},
});

export const deleteOperation = new ValidatedMethod({
	name: 'operations.remove',
	validate: new SimpleSchema({
		_id: { type: String },
	}).validator(),
	run({ _id }) {
		if (!this.userId)
			throw new Meteor.Error('500', 'forbiden: Only the owner can do this action');
		Operations.remove(_id);
	},
});
