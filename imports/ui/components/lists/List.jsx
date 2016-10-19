import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import {ListGroupItem, Button, Glyphicon, Label } from 'react-bootstrap'

import { Lists } from '../../../api/lists/lists.js'

const proTypes = {
	list: PropTypes.object.isRequired,
	selectedItemId: PropTypes.string.isRequired,
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
				<span className="pushRight">
					<Glyphicon 
						onClick={() => this.deleteThisList()}
						glyph="glyphicon glyphicon-remove"
					/>
				</span>
			</ListGroupItem>
		);
	}
}
 
List.propTypes = proTypes;

export default List;