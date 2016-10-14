import { createContainer } from 'meteor/react-meteor-data';

import Dashboard from '../pages/admin/Dashboard.jsx'

export default AdminMainContainer = createContainer(({params}) => {
	
	const currentUser = Meteor.user();

	return {
		currentUser,
	};
}, Dashboard);
