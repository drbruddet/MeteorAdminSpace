import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import OperationSynthesis from '../../components/operations/operationSynthesis.jsx';
import OperationForm from '../../components/operations/operationForm.jsx';
import OperationList from '../../components/operations/operationList.jsx';

const propTypes = {
	operationsDebit: PropTypes.array.isRequired,
	operationsCredit: PropTypes.array.isRequired,
	operationsDebitCount: PropTypes.number.isRequired,
	operationsCreditCount: PropTypes.number.isRequired,
}

class BudgetPage extends Component {

	calculTotalOperationsAmount(type) {
		let total = 0;
		if (type === "debit") {
			this.props.operationsDebit.map((operation) => {
				total += operation.amount;
			});
		} else if (type === "credit") {
			this.props.operationsCredit.map((operation) => {
				total += operation.amount;
			});
		}
		return total;
	}

	render() {
		return (
			<div className="container">
				<OperationSynthesis 
					{...this.props}
					calculDebitTotalAmount={this.calculTotalOperationsAmount("debit")}
					calculCreditTotalAmount={this.calculTotalOperationsAmount("credit")}
				/>
				<div className="clearfix"></div>
				<OperationForm />
				<OperationList {...this.props} />
			</div>
		);
	}
}

BudgetPage.PropTypes = propTypes;

export default BudgetPage;
