import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import {ListGroupItem, Glyphicon, Label } from 'react-bootstrap'

import { Lists } from '../../../api/lists/lists.js'

const propTypes = {
	list: PropTypes.object.isRequired,
	selectedItemId: PropTypes.string.isRequired,
	countPendingTasks: PropTypes.number.isRequired,
};

class List extends Component {

	deleteThisList() {
		Meteor.call('lists.remove', this.props.list._id);
	}

	render() {
		return (
			<ListGroupItem 
				className={(this.props.list._id == this.props.selectedItemId) ? 'active':''} 
				onClick={this.props.selectList}
			>
				{this.props.list.name}
				<Label className="pushRight label-counter">{this.props.countPendingTasks}</Label>
				<Glyphicon className="pushRight red"
					onClick={() => this.deleteThisList()}
					glyph="glyphicon glyphicon-remove"
				/>
				
			</ListGroupItem>
		);
	}
}
 
List.propTypes = propTypes;

export default List;