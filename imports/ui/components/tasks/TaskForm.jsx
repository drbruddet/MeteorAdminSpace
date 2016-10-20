import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

const propTypes = {
	listId: PropTypes.string.isRequired,
};

class TaskForm extends Component {

	handleSubmit(event) {
		event.preventDefault();
 
 		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 		const priority = ReactDOM.findDOMNode(this.refs.priorityInput).value.trim();

 		Meteor.call('tasks.insert', text, priority, this.props.listId, (err) => {
 			if (err) {
 				// Error Message
 			}	
 		});

		ReactDOM.findDOMNode(this.refs.textInput).value = '';
		ReactDOM.findDOMNode(this.refs.priorityInput).value = 'normal';
	}

	render() {
		return (
			<Form inline bsClass="form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
				<div className="row inline-my-form">
					<FormGroup className="form-group col-xs-12 col-md-7 no-padding">
						<FormControl
							className="form-control input-group-lg reg_name col-md-7"
							type="text"
							ref="textInput"
							placeholder="Type to add new tasks"
						/>
					</FormGroup>
					<FormGroup className="form-group col-xs-8 col-md-3 no-padding">
						<FormControl 
							componentClass="select"
							className="form-control input-group-lg reg_name col-md-3"
							placeholder="select"
							ref="priorityInput">
							<option value="normal">Normal</option>
							<option value="important">Important</option>
							<option value="urgent">Urgent</option>
						</FormControl>
					</FormGroup>
					<FormGroup className="form-group col-xs-4 col-md-2 no-padding">
						<Button bsStyle="primary" className="form-control input-group-lg reg_name col-md-2" type="submit">Add</Button>
					</FormGroup>
				</div>
			</Form>
		);
	}
}

TaskForm.propTypes = propTypes;
 
export default TaskForm;