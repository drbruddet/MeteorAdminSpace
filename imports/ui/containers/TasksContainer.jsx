import { createContainer } from 'meteor/react-meteor-data';

import { Lists } from '../../api/lists/lists.js';
import { Tasks } from '../../api/tasks/tasks.js';

import TodosPage from '../pages/admin/TodosPage.jsx'

export default TodosContainer = createContainer(({params}) => {

	Meteor.subscribe('lists');
	Meteor.subscribe('tasks');

	return {
		lists: Lists.find({}, { sort: { createdAt: -1 } }).fetch(),
		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
	};

}, TodosPage);