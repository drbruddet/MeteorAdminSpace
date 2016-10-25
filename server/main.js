import { Meteor } from 'meteor/meteor';

// LISTS (TODOLIST)
import '../imports/api/lists/server/publications.js';
import '../imports/api/lists/methods.js';

// TASKS (TODOLIST)
import '../imports/api/tasks/server/publications.js';
import '../imports/api/tasks/methods.js';

// OPERATIONS (BUDGET)
import '../imports/api/operations/server/publications.js';
import '../imports/api/operations/methods.js';

Meteor.startup(() => {
  // code to run on server at startup
});
