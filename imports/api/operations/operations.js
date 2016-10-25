import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
 
export const Operations = new Mongo.Collection('operations');

Operations.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Operations.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

var Schemas = {};

Schemas.Operations = new SimpleSchema({
    name: {
        type: String,
        label: "Operation Name",
        max: 200
    },
    description: {
        type: String,
        label: "Operation Description",
        max: 1500,
        optional: true,
    },
    amount: {
        type: Number,
        label: "Operation Amount",
        decimal: true,
        optional: false,
    },
    type: {
        type: String,
        label: "Credit or Debit",
        allowedValues: ["credit", "debit"],
        defaultValue: "debit",
    },
    frequency: {
        type: String,
        label: "Daily, Weekly, Monthly, Yearly",
        allowedValues: ["daily", "weekly", "monthly", "yearly"],
        defaultValue: "monthly",
    },
    createdAt: {
        type: Date,
        label: "Creation Date"
    },
});
Operations.attachSchema(Schemas.Operations);
