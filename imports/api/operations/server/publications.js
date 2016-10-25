import { Meteor } from 'meteor/meteor';
import { Operations } from '../operations';

Meteor.publish('operations', () => Operations.find());