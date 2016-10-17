import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../../api/tasks/tasks.js';

import TodosPage from '../pages/admin/TodosPage.jsx'

export default TodosContainer = createContainer(({params}) => {

	Meteor.subscribe('tasks');
	
	return { 
		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
		currentUser: Meteor.user(),
	};

}, TodosPage);