import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { Checkbox, PageHeader, ListGroup, Table, Badge, Panel, Col } from 'react-bootstrap'

import { Lists } from '../../../api/lists/lists.js';
import { Tasks } from '../../../api/tasks/tasks.js';

import ListForm from '../../components/lists/ListForm.jsx';
import List from '../../components/lists/List.jsx';
import TaskList from '../../components/tasks/TaskList.jsx';

const propTypes = {
	lists: PropTypes.array.isRequired,
	tasks: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	currentUser: PropTypes.object,
}

class TodosPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			listSelected: "",
		};
	}

	selectList(listId) {
		this.setState({ listSelected: listId });
		browserHistory.push('/admin/todos/' + listId);
	}

	countPendingTasks(listId) {
		let nbTask = 0;
		this.props.tasks.forEach(function(task) {
			if (listId === task.listId && !task.checked) nbTask++
		});
		return (nbTask);
	}

	renderLists() {
		return this.props.lists.map((list) => (
			<List 
				selectedItemId={this.state.listSelected}
				selectList={() => this.selectList(list._id)}
				key={list._id}
				list={list}
				countPendingTasks={this.countPendingTasks(list._id)}
			/>
		));
	}

	render() {
		return (
			<div className="container">
				<PageHeader>Todo List <Badge className="megaBadges">{this.props.incompleteCount}</Badge></PageHeader>
				
				<Col xs={12} md={3} lg={3}>
					<ListForm listSelected={this.state.listSelected} onSubmit={this.selectList.bind(this)}/>
					<ListGroup>
						{this.renderLists()}
					</ListGroup>
				</Col>

				{(() => {
					if (this.state.listSelected) {
						return (
							<TaskList tasks={this.props.tasks} listSelected={this.state.listSelected} />
						);
					} else {
						return (
							<Col xs={12} md={9} lg={9}>
								<Panel header="Tips?" bsStyle="info">
									Please Select a list ..
								</Panel>
							</Col>
						);
					}
				})()}
			</div>
		);
	}
}

TodosPage.PropTypes = propTypes;

export default TodosPage;
