import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Operations = new Mongo.Collection('operations');

if (Meteor.isServer) {
	Meteor.publish('operations', function operationsPublication() {
		return Operations.find();
	});
}

Meteor.methods({

	'operations.insert'(name, description, amount, type, frequency) {
		check(name, String);
		check(description, String);
		check(amount, Number);
		check(type, String);
		check(frequency, String);

		try {
			if (!this.userId)
				throw new Meteor.Error('500', 'Must be logged in to add new Operation.');

			Operations.insert({
				name,
				description,
				amount,
				type,
				frequency,
				createdAt: new Date(),
				owner: this.userId
			}); 
		} catch (exception) {
			throw new Meteor.Error('500', exception.message);
		}
	},

	'operations.remove'(operationId) {
		check(operationId, String);

		Operations.remove(operationId);
	},

});
