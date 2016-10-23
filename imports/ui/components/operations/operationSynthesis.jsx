import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Panel, Col } from 'react-bootstrap';

const propTypes = {
	operationsDebit: PropTypes.array.isRequired,
	operationsCredit: PropTypes.array.isRequired,
	operationsDebitCount: PropTypes.number.isRequired,
	operationsCreditCount: PropTypes.number.isRequired,
	calculDebitTotalAmount: PropTypes.number.isRequired,
	calculCreditTotalAmount: PropTypes.number.isRequired
};

class OperationSynthesis extends Component {

	roundResult(calcul) {
		return Math.round(calcul * 100) / 100;
	}

	calculTotalAmount(type, frequency) {
		let total = 0;
		if (frequency === "month") {
			type.map((operation) => {
				if (operation.frequency === "daily")
					total += operation.amount * 30.4375;
				if (operation.frequency === "weekly")
					total += operation.amount * 4.34524;
				else if (operation.frequency === "monthly")
					total += operation.amount;
				else if (operation.frequency === "yearly")
					total += operation.amount / 12;
			});
		} else if (frequency === "year") {
			type.map((operation) => {
				if (operation.frequency === "dayly")
					total += operation.amount * 365;
				if (operation.frequency === "weekly")
					total += operation.amount * 52.1429;
				else if (operation.frequency === "monthly")
					total += operation.amount * 12;
				else if (operation.frequency === "yearly")
					total += operation.amount;
			});
		}
		return this.roundResult(total);
	}

	render() {
		return (
			<Col xs={12} md={4} lg={4}>
				<Panel>
					<div className="">
						<h3>SUMMARY</h3>
						<p><strong>Credits This Month: </strong> 
							{this.props.operationsCreditCount} operations for 
							<strong className="grey"> {this.calculTotalAmount(this.props.operationsCredit, "month")} €</strong>
							<br/>
							<strong>Debits This Month: </strong> 
							{this.props.operationsDebitCount} operations for 
							<strong className="grey"> {this.calculTotalAmount(this.props.operationsDebit, "month")} €</strong>	
						</p>
						<p>
							<strong>Credits This Year: </strong> 
							{this.props.operationsCreditCount * 12} operations for 
							<strong className="grey"> {this.calculTotalAmount(this.props.operationsCredit, "year")} €</strong>
							<br/>
							<strong>Debits This Year: </strong> 
							{this.props.operationsDebitCount * 12} operations for 
							<strong className="grey"> {this.calculTotalAmount(this.props.operationsDebit, "year")} €</strong>
						</p>
						<h4>TOTAL REMAIN</h4>
						<p><strong>Remain per Month: </strong> 
							<strong className="red"> {this.roundResult((this.calculTotalAmount(this.props.operationsCredit, "month") - this.calculTotalAmount(this.props.operationsDebit, "month")))} €</strong>
							<br/>
							<strong>Remain per Year: </strong> 
							<strong className="red"> {this.roundResult((this.calculTotalAmount(this.props.operationsCredit, "year") - this.calculTotalAmount(this.props.operationsDebit, "year")))} €</strong>
						</p>
					</div>
				</Panel>
			</Col>
		);
	}
}

OperationSynthesis.propTypes = propTypes;

export default OperationSynthesis;