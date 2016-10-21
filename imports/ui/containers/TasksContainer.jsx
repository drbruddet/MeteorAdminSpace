import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Lists } from '../../api/lists/lists.js';
import { Tasks } from '../../api/tasks/tasks.js';

import TodosPage from '../pages/admin/TodosPage.jsx'

export default TodosContainer = createContainer(({params}) => {

	Meteor.subscribe('lists');
	Meteor.subscribe('tasks');

	Session.setDefault("sort_order", {createdAt: 0 });

	return {
		lists: Lists.find({}, { sort: { createdAt: -1 } }).fetch(),
		tasks: Tasks.find({}, { sort: Session.get("sort_order") }).fetch(),
		incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
	};

}, TodosPage);