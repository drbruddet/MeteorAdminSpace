import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Checkbox, Table, Col, DropdownButton, MenuItem } from 'react-bootstrap';

import Task from '../../components/tasks/Task.jsx';
import TaskForm from '../../components/tasks/TaskForm.jsx';

const propTypes = {
	tasks: PropTypes.array.isRequired,
	listSelected: PropTypes.string.isRequired,
}

class TaskPanel extends Component {

	constructor(props) {
		super(props);
		this.state = { hideCompleted: false };
	}

	toggleHideCompleted() {
		this.setState({ hideCompleted: !this.state.hideCompleted });
	}

	handleSelect(event) {
    	console.log(event);
    	switch(event) {
			case 1: return Session.set("sort_order", {createdAt: -1 });
			case 2: return Session.set("sort_order", {createdAt: 0 });
			//case "Alpha": 		return Session.set("sort_order", {lowerText : 0 });
			//case "Pending": 	return Session.set("sort_order", {checked: 0 });
			//case "Finished": 	return Session.set("sort_order", {checked: -1 });
			//case "Priority": 	return Session.set("sort_order", {priority: -1 });
		};
	}

	renderTasks() {
		let rows = [];
		let filteredTasks = this.props.tasks;
		let selectedListId = this.props.listSelected;
		if (this.state.hideCompleted) {
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}
		filteredTasks.forEach(function(task) {
			if (selectedListId === task.listId) {
				rows.push(<Task key={task._id} task={task} />);
			}
		});
		return rows;
	}

	render() {
		return (
			<Col xs={12} md={9} lg={9}>
				<TaskForm listId={this.props.listSelected} />

				<div className="clearfix">
					<Checkbox
						readOnly
						className="sortCheckbox col-xs-12 col-md-4 col-lg-5"
						checked={this.state.hideCompleted}
						onClick={() => this.toggleHideCompleted()}
						> Hide Completed Tasks
					</Checkbox>
					<div className="my-float-right">
						<DropdownButton id={"sortTask-" + this.props.listSelected} bsSize="small" bsStyle="info" title="Sort Tasks" onSelect={this.handleSelect}>
							<MenuItem eventKey="1">Created Date Asc</MenuItem>
							<MenuItem eventKey="2">Created Date Desc</MenuItem>
						</DropdownButton>
					</div>
				</div>

				<Table responsive condensed>
					<tbody>
						{this.renderTasks()}
					</tbody>
				</Table>
			</Col>
		);
	}
}

TaskPanel.PropTypes = propTypes;

export default TaskPanel;
