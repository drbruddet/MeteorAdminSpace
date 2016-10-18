import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

import { Tasks } from '../../../api/tasks/tasks.js';

const proTypes = {
	listId: PropTypes.string.isRequired,
};

class TaskForm extends Component {

	handleSubmit(event) {
		event.preventDefault();
 
 		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 		const priority = ReactDOM.findDOMNode(this.refs.priorityInput).value.trim();
 
 		Meteor.call('tasks.insert', text, priority, this.props.listId);
 
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
		ReactDOM.findDOMNode(this.refs.priorityInput).value = 'normal';
	}

	render() {
		return (
			<Form inline onSubmit={this.handleSubmit.bind(this)} >
				<FormGroup>
					<FormControl
						type="text"
						ref="textInput"
						placeholder="Type to add new tasks"
					/>
					<FormControl 
						componentClass="select" 
						placeholder="select"
						ref="priorityInput">
						<option value="normal">Normal</option>
						<option value="important">Important</option>
						<option value="urgent">Urgent</option>
					</FormControl>
				</FormGroup>
				<Button bsStyle="primary" type="submit">Add</Button>
			</Form>
		);
	}
}

TaskForm.propTypes = proTypes;
 
export default TaskForm;