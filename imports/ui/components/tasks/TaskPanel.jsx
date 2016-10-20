import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { Checkbox, Table, Col } from 'react-bootstrap'

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

				<Checkbox
					readOnly
					className="sortCheckbox"
					checked={this.state.hideCompleted}
					onClick={() => this.toggleHideCompleted()}
					> Hide Completed Tasks
				</Checkbox>

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
