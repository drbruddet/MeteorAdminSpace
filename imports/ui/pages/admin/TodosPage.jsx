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
}

class TodosPage extends Component {

	constructor(props) {
		super(props);
		this.state = { listSelected: "" };
		this.selectList = this.selectList.bind(this);
	}

	selectList(listId) {
		this.setState({ listSelected: listId });
		console.log(listId);
		if (listId)
			browserHistory.push('/admin/todos/' + listId);
		else
			browserHistory.push('/admin/todos/');
	}

	render() {
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
					tasks = {this.props.tasks}
				/>

				{(() => {
					if (this.state.listSelected) {
						return (
							<TaskPanel 
								tasks = {this.props.tasks} 
								listSelected = {this.state.listSelected} 
							/>
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
