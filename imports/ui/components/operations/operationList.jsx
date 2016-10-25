import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import Operation from './Operation.jsx';

const propTypes = {
	operationsDebit: PropTypes.array.isRequired,
	operationsCredit: PropTypes.array.isRequired,
	operationsDebitCount: PropTypes.number.isRequired,
	operationsCreditCount: PropTypes.number.isRequired
};

class OperationList extends Component {

	roundResult(calcul) {
		return Math.round(calcul * 100) / 100;
	}

	renderOperations(type, result) {
		if (type === "debit") {
			switch(result) {
				case "operation":
					return this.props.operationsDebit.map((operation) => (
						<Operation key={operation._id} operation={operation} />
					));
				case "count":
					return this.props.operationsDebitCount;
				case "totalAmount":
					return this.props.calculDebitTotalAmount;
			}
		} else if (type === "credit") {
			switch(result) {
				case "operation":
					return this.props.operationsCredit.map((operation) => (
						<Operation key={operation._id} operation={operation} />
					));
				case "count":
					return this.props.operationsCreditCount;
				case "totalAmount":
					return this.props.calculCreditTotalAmount;
			}
		}
	}

	render() {
		return (
			<div>
				<Table striped condensed>
					<thead>
						<tr>
							<th className="tableTitle">Credits</th>
						</tr>
					</thead>
					<tbody>
						{this.renderOperations("credit", "operation")}
					</tbody>
				</Table>
				<Table striped condensed>
					<thead>
						<tr>
							<th className="tableTitle">Debits</th>
						</tr>
					</thead>
					<tbody>
						{this.renderOperations("debit", "operation")}
					</tbody>
				</Table>
			</div>
		);
	}
}

OperationList.propTypes = propTypes;

export default OperationList;
