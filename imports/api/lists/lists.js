import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
 
export const Lists = new Mongo.Collection('lists');

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
});
Lists.attachSchema(Schemas.Lists);