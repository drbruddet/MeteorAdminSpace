import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Operations } from '../../api/operations/operations.js';

import BudgetPage from '../pages/admin/BudgetPage.jsx'

export default OperationsContainer = createContainer(({params}) => {

	Meteor.subscribe('operations');

	return {
		operationsDebit: Operations.find({type: "debit"}, {sort: {createdAt: -1}}).fetch(),
		operationsCredit: Operations.find({type: "credit"}, {sort: {createdAt: -1}}).fetch(),
		operationsDebitCount: Operations.find({type: "debit"}).count(),
		operationsCreditCount: Operations.find({type: "credit"}).count(),
	};

}, BudgetPage);