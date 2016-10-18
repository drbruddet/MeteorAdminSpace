import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks } from '/imports/api/tasks/tasks.js';
 
export const Lists = new Mongo.Collection('lists');

if (Meteor.isServer) {
	Meteor.publish('lists', function listsPublication() {
		return Lists.find();
	});
}

Meteor.methods({

	'lists.insert'(name) {
		check(name, String);

		try {
			if (!this.userId)
				throw new Meteor.Error('500', 'Must be logged in to add new lists.');
			
			Lists.insert({
				name,
				createdAt: new Date(),
				owner: this.userId
			});
		} catch (exception) {
			throw new Meteor.Error('500', exception.message);
		}
	},

	'lists.remove'(listId) {
		check(listId, String);
 
		try {
			const list = Lists.findOne(listId);
			if (list.owner !== this.userId)
				throw new Meteor.Error('500', 'Must own the list to delete.');
			//Tasks.remove({"listId": listId});
			Lists.remove(listId);
		} catch (exception) {
			throw new Meteor.Error('500', exception.message);
		}
	},

});

Lists.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Lists.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

var Schemas = {};

Schemas.Lists = new SimpleSchema({
    name: {
        type: String,
        label: "List Name",
        max: 200
    },
    createdAt: {
        type: Date,
        label: "Creation Date"
    },
    owner: {
        type: String,
        label: "Owner ID"
    }
});
Lists.attachSchema(Schemas.Lists);