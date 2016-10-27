import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Form, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { insertOperation } from '../../../api/operations/methods.js'

class OperationForm extends Component {

	handleSubmit(event) {
		event.preventDefault();

		const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
		const description = ReactDOM.findDOMNode(this.refs.descriptionInput).value.trim();
		const amount = Number(ReactDOM.findDOMNode(this.refs.amountInput).value.trim());
		const type = ReactDOM.findDOMNode(this.refs.typeInput).value.trim();
		const frequency = ReactDOM.findDOMNode(this.refs.frequencyInput).value.trim();
 
 		if (name) {
 			insertOperation.call({ 
 				name: name,
 				description: description,
 				amount: amount,
 				type: type,
 				frequency: frequency,
 				createdAt: new Date(),
 			}, (error) => {
 				if (error) {
 					console.log(error);
 				} else {
					ReactDOM.findDOMNode(this.refs.nameInput).value = "";
					ReactDOM.findDOMNode(this.refs.descriptionInput).value = "";
					ReactDOM.findDOMNode(this.refs.amountInput).value = "";
					ReactDOM.findDOMNode(this.refs.frequencyInput).value = "";
					ReactDOM.findDOMNode(this.refs.typeInput).value = "";
 				}
 			});
 		}
	}

	render() {
		return (
			<Form inline bsClass="form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
				<h4 className="ui dividing header">New Operation</h4>
				<div className="inline-my-form">
					<FormGroup className="form-group col-xs-12 col-md-8 no-padding">
						<FormControl
							className="form-control input-group-lg reg_name col-md-7"
							type="text"
							ref="nameInput"
							placeholder="Name" />
					</FormGroup>
					<FormGroup className="form-group col-xs-4 col-md-2 no-padding">
						<FormControl
							className="form-control input-group-lg reg_name col-md-7"
							type="text"
							ref="amountInput"
							placeholder="Amount" />
					</FormGroup>
					<FormGroup className="form-group col-xs-4 col-md-1 no-padding">
						<FormControl 
							componentClass="select"
							className="form-control input-group-lg reg_name col-md-1"
							placeholder="select"
							ref="frequencyInput" >
							<option value="">Frequency</option>
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
							<option value="yearly">Yearly</option>
						</FormControl>
					</FormGroup>
					<FormGroup className="form-group col-xs-4 col-md-1 no-padding">
						<FormControl 
							componentClass="select"
							className="form-control input-group-lg reg_name col-md-1"
							placeholder="select"
							ref="typeInput" >
							<option value="">Type</option>
							<option value="debit">Debit</option>
							<option value="credit">Credit</option>
						</FormControl>
					</FormGroup>
				</div>
				<div className="inline-my-form">
				<FormGroup className="form-group col-xs-8 col-md-10 no-padding">
						<FormControl
							className="form-control input-group-lg reg_name col-md-10"
							type="text"
							ref="descriptionInput"
							placeholder="Description" />
					</FormGroup>
					<FormGroup className="form-group col-xs-4 col-md-2 no-padding">
						<Button bsStyle="primary" className="form-control input-group-lg reg_name col-md-2" type="submit">New Operation</Button>
					</FormGroup>
				</div>
			</Form>
		);
	}
}

export default OperationForm;
