import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data'
import { Checkbox, PageHeader, ListGroup, Table, Badge } from 'react-bootstrap'

import { Tasks } from '../../../api/tasks/tasks.js';

import TaskForm from '../../components/tasks/TaskForm.jsx';
import Task from '../../components/tasks/Task.jsx';

const proTypes = {
	tasks: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	currentUser: PropTypes.object,
}

class TodosPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			hideCompleted: false,
		};
	}

	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted,
		});
	}

	renderTasks() {
		let filteredTasks = this.props.tasks;
		if (this.state.hideCompleted) {
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}
		return filteredTasks.map((task) => (
			<Task key={task._id} task={task} />
		));
	}

	render() {
		return (
			<div className="container">
				<PageHeader>Todo List <Badge>{this.props.incompleteCount}</Badge></PageHeader>

				<Checkbox
					readOnly
					checked={this.state.hideCompleted}
					onClick={this.toggleHideCompleted.bind(this)}
				>
				Hide Completed Tasks
				</Checkbox>

	 			{ this.props.currentUser ? <TaskForm /> : '' }

				<Table responsive condensed>
					<tbody>
						{this.renderTasks()}
					</tbody>
				</Table>
			</div>
		);
	}
}

TodosPage.PropTypes = proTypes;

export default TodosPage;
