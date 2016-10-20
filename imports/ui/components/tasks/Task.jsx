import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Checkbox, ButtonGroup, Button, Glyphicon, Label, OverlayTrigger, Popover } from 'react-bootstrap'

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

	dateFormate(time) {
 		return ((moment().unix() - moment(time).unix()) < 3600) ? 
 			moment(time).fromNow() : moment(time).format("DD / MM / YYYY HH:mm");
	}

	render() {
		const taskClassName = this.props.task.checked ? 'success' : '';

		const popoverHoverFocus = (
			<Popover id="popover-trigger-hover-focus" title="Informations">
				<strong>Created: </strong>{this.dateFormate(this.props.task.createdAt)}
			</Popover>
		);

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
				<td className="vert-align col-sm-2 col-md-2 col-lg-2 text-right">
					<ButtonGroup>
						<Button className="btn-sm">
    						<OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
								<Glyphicon glyph="glyphicon glyphicon-info-sign" />
							</OverlayTrigger>
						</Button>
    					<Button bsStyle="danger" className="btn-sm" onClick={() => this.deleteThisTask()}>
							<Glyphicon glyph="glyphicon glyphicon-remove" />
						</Button>
  					</ButtonGroup>
				</td>
			</tr>
		);
	}
}
 
Task.propTypes = propTypes;

export default Task;