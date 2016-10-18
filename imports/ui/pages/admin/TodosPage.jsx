import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data'
import { Checkbox, PageHeader, ListGroup, Table, Badge, Panel, Col } from 'react-bootstrap'

import { Lists } from '../../../api/lists/lists.js';
import { Tasks } from '../../../api/tasks/tasks.js';

import ListForm from '../../components/lists/ListForm.jsx';
import List from '../../components/lists/List.jsx';
import TaskForm from '../../components/tasks/TaskForm.jsx';
import Task from '../../components/tasks/Task.jsx';

const proTypes = {
	lists: PropTypes.array.isRequired,
	tasks: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	currentUser: PropTypes.object,
}

class TodosPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			hideCompleted: false,
			listSelected: ""
		};
	}

	toggleHideCompleted() {
		this.setState({ hideCompleted: !this.state.hideCompleted });
	}

	selectList(listId) {
		this.setState({ listSelected: listId });
	}

	renderLists() {
		return this.props.lists.map((list) => (
			<List 
				selectList={this.selectList.bind(this, list._id)}
				key={list._id}
				list={list}
			/>
		));
	}

	renderTasks() {
		if (!this.state.listSelected) {
			return "Please select a list ...";
		}
		let rows = [];
		let filteredTasks = this.props.tasks;
		let selectedListId = this.state.listSelected;
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
			<div className="container">
				<PageHeader>Todo List <Badge>{this.props.incompleteCount}</Badge></PageHeader>
				
				<Col xs={12} md={3} lg={3}>
					<Panel>
						{this.props.currentUser ? <ListForm /> : ''}
						<ListGroup>
							{this.renderLists()}
						</ListGroup>
					</Panel>
				</Col>

				<Col xs={12} md={9} lg={9}>
					<Panel>
						{this.props.currentUser ? <TaskForm listId={this.state.listSelected} /> : ''}
					</Panel>

					<Checkbox
						readOnly
						className="sortCheckbox"
						checked={this.state.hideCompleted}
						onClick={this.toggleHideCompleted.bind(this)}
					>
					Hide Completed Tasks
					</Checkbox>

					<Table responsive condensed>
						<tbody>
							{this.renderTasks()}
						</tbody>
					</Table>
				</Col>
			</div>
		);
	}
}

TodosPage.PropTypes = proTypes;

export default TodosPage;
