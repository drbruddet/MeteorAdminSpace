import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data'
import { Checkbox, PageHeader, ListGroup, Table, Badge, Panel, Col } from 'react-bootstrap'

import { Lists } from '../../../api/lists/lists.js';
import { Tasks } from '../../../api/tasks/tasks.js';

import ListForm from '../../components/lists/ListForm.jsx';
import List from '../../components/lists/List.jsx';
import TaskList from '../../components/tasks/TaskList.jsx';

const proTypes = {
	lists: PropTypes.array.isRequired,
	tasks: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	currentUser: PropTypes.object,
}

class TodosPage extends Component {

	constructor(props) {
		super(props);
		this.state = { listSelected: "" };
	}

	selectList(listId) {
		this.setState({ listSelected: listId });
	}

	renderLists() {
		return this.props.lists.map((list) => (
			<List 
				selectedItemId={this.state.listSelected}
				selectList={() => this.selectList(list._id)}
				key={list._id}
				list={list}
			/>
		));
	}

	render() {
		return (
			<div className="container">
				<PageHeader>Todo List <Badge>{this.props.incompleteCount}</Badge></PageHeader>
				
				<Col xs={12} md={3} lg={3}>
					<ListForm />
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

TodosPage.PropTypes = proTypes;

export default TodosPage;
