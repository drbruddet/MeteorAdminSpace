import React, { Component, PropTypes } from 'react'
import { ListGroup, Col } from 'react-bootstrap'

import ListForm from '../../components/lists/ListForm.jsx';
import List from '../../components/lists/List.jsx';

const propTypes = {
	lists: PropTypes.array.isRequired,
	tasks: PropTypes.array.isRequired,
	listSelected: PropTypes.string.isRequired,
}

class ListPanel extends Component {

	constructor(props) {
		super(props);
		this.state = { editing: null };
	}

	toggleHideCompleted() {
		this.setState({ hideCompleted: !this.state.hideCompleted });
	}

	countPendingTasks(listId) {
		let nbTask = 0;
		this.props.tasks.forEach((task) => {
			if (listId === task.listId && !task.checked) nbTask++
		});
		return (nbTask);
	}

	renderLists() {
		return this.props.lists.map((list) => (
			<List 
				selectedItemId ={this.props.listSelected}
				selectList = {this.props.selectList}
				key = {list._id}
				list = {list}
				countPendingTasks = {this.countPendingTasks(list._id)}
			/>
		));
	}

	render() {
		return (
			<Col xs={12} md={3} lg={3}>
				<ListForm selectList = {this.props.selectList} />
				<ListGroup>
					{this.renderLists()}
				</ListGroup>
			</Col>
		);
	}
}

ListPanel.PropTypes = propTypes;

export default ListPanel;
