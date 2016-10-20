import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Form, FormGroup, FormControl } from 'react-bootstrap'

class ListForm extends Component {

	handleSubmit(event) {
		event.preventDefault();
 
 		const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
 		Meteor.call('lists.insert', name, (err, listId) => {
 			if (!err) {
 				this.props.selectList(listId);
 			}	
 		});
		ReactDOM.findDOMNode(this.refs.nameInput).value = '';
	}

	render() {
		return (
			<Form bsClass="col-xs-12" onSubmit={this.handleSubmit.bind(this)} >
				<FormGroup bsClass="form-group">
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