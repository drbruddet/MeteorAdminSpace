import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { PageHeader, Badge, Panel, Col } from 'react-bootstrap'

import ListPanel from '../../components/lists/ListPanel.jsx';
import TaskPanel from '../../components/tasks/TaskPanel.jsx';

const propTypes = {
	lists: PropTypes.array.isRequired,
	tasks: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	sorting: PropTypes.string.isRequired,
}

class TodosPage extends Component {

	constructor(props) {
		super(props);
		this.state = { listSelected: "" };
		this.selectList = this.selectList.bind(this);
	}

	selectList(listId) {
		this.setState({ listSelected: listId });
		listId ? browserHistory.push('/admin/todos/' + listId) : browserHistory.push('/admin/todos/');
	}

	render() {
		const selectedPanel = this.state.listSelected ? 
			<TaskPanel 
				tasks = {this.props.tasks} 
				listSelected = {this.state.listSelected} 
				sorting = {this.props.sorting} 
				sortTasks = {this.props.sortTasks} /> :
			<Col xs={12} md={9} lg={9}> 
				<Panel header="Tips?" bsStyle="info"> Please Select a list .. </Panel>
			</Col>

		return (
			<div className="container">
				<PageHeader>Todo List
					<Badge className="megaBadges">
						{this.props.incompleteCount}
					</Badge>
				</PageHeader>
				
				<ListPanel
					listSelected = {this.state.listSelected} 
					selectList = {this.selectList} 
					lists = {this.props.lists} 
					tasks = {this.props.tasks} />
				{selectedPanel}
			</div>
		);
	}
}

TodosPage.PropTypes = propTypes;

export default TodosPage;
