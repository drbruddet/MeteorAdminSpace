import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Checkbox, ListGroupItem, Button } from 'react-bootstrap'

import { Tasks } from '../../../api/tasks/tasks.js';

const proTypes = {
	task: PropTypes.object.isRequired,
};

class Task extends Component {

	toggleChecked() {
		// Set the checked property to the opposite of its current value
		Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
	}
 
	deleteThisTask() {
		Meteor.call('tasks.remove', this.props.task._id);
	}

	render() {
		const taskClassName = this.props.task.checked ? 'checked' : '';

		return (
			<ListGroupItem className={taskClassName}>
				<Button className="delete" onClick={this.deleteThisTask.bind(this)}>
					&times;
				</Button>

				<Checkbox
					readOnly
					checked={this.props.task.checked}
					onClick={this.toggleChecked.bind(this)}
				/>

				<span>{this.props.task.text}</span>
			</ListGroupItem>
		);
	}
}
 
Task.propTypes = proTypes;

export default Task;