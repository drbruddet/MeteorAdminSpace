import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tasks = new Mongo.Collection('tasks');

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
	listId: {
		type: String,
	},
	checked: {
		type: Boolean,
		label: "Task is Done"
	}
});

Tasks.attachSchema(Schemas.Tasks);