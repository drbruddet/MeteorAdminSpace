import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Checkbox, Table, Button, Glyphicon, Label } from 'react-bootstrap'

import { Tasks } from '../../../api/tasks/tasks.js'

import './Task.styl'

const propTypes = {
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

	priorityLabel() {
		switch (this.props.task.priority) {
			case 'normal': return "success";
			case 'important': return "warning";
			case 'urgent': return "danger";
		}
	}

	render() {
		const taskClassName = this.props.task.checked ? 'success' : '';

		return (
			<tr className={taskClassName}>
				<td className="vert-align condensed">
					<Checkbox
						readOnly
						checked={this.props.task.checked}
						onClick={() => this.toggleChecked()}
					/>
				</td>
				<td className="vert-align col-sm-1 col-md-1 col-lg-1">
					<Label bsStyle={this.priorityLabel()}>
						{this.props.task.priority}
					</Label>
				</td>
				<td className="vert-align">
					{this.props.task.text}
				</td>
				<td className="vert-align col-sm-2 col-md-2 col-lg-1 text-right">
					<Button bsStyle="danger" className="btn-sm" onClick={() => this.deleteThisTask()}>
						<Glyphicon glyph="glyphicon glyphicon-remove" />
					</Button>
				</td>
			</tr>
		);
	}
}
 
Task.propTypes = propTypes;

export default Task;