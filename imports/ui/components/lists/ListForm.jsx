import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

import { Tasks } from '../../../api/lists/lists.js';

class ListForm extends Component {

	handleSubmit(event) {
		event.preventDefault();
 
 		const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
 
 		Meteor.call('lists.insert', name);

		ReactDOM.findDOMNode(this.refs.nameInput).value = '';
	}

	render() {
		return (
			<Form inline onSubmit={this.handleSubmit.bind(this)} >
				<FormGroup>
					<FormControl
						type="text"
						ref="nameInput"
						placeholder="Add New List"
					/>
				</FormGroup>
			</Form>
		);
	}
}
 
export default ListForm;