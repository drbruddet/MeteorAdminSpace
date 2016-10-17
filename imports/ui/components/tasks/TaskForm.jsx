import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Form, FormGroup, FormControl } from 'react-bootstrap'


import { Tasks } from '../../../api/tasks/tasks.js';

class TaskForm extends Component {

	handleSubmit(event) {
		event.preventDefault();
 
 		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
 		Meteor.call('tasks.insert', text);
 
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit.bind(this)} >
				<FormGroup>
					<FormControl
						type="text"
						ref="textInput"
						placeholder="Type to add new tasks"
					/>
				</FormGroup>
			</Form>
		);
	}
}
 
export default TaskForm;