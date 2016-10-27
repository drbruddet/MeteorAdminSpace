import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { ListGroupItem, Glyphicon, Label, FormGroup, FormControl } from 'react-bootstrap'
import { deleteList, updateList } from '../../../api/lists/methods.js'

const propTypes = {
	list: PropTypes.object.isRequired,
	selectedItemId: PropTypes.string.isRequired,
	countPendingTasks: PropTypes.number.isRequired,
};

class List extends Component {

	constructor(props) {
		super(props);
		this.state = { editing: null };
	}

	toggleEditing() {
		this.setState({ editing: this.props.list._id });
	}

	deleteThisList() {
		deleteList.call({ 
			_id: this.props.list._id,
		}, (error) => {
 			if (error) {
 				console.log(error);
 			} else {
 				(this.props.selectedItemId === this.props.list._id) ? 
 					this.props.selectList("") : this.props.selectList(this.props.selectedItemId) 
 			}
 		});
	}

	handleEditList(event) {
		if (event.keyCode === 13) {
			const listId = this.state.editing;
			const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();

			updateList.call({ 
				_id: listId,
				update: {
					name,
				},
			}, (error) => {
 				if (error) {
 					console.log(error);
 				} else {
 					this.setState({ editing: null });
 				}
 			});
		} else if (event.keyCode === 27) {
			this.setState({ editing: null });
		}
	}

	render() {

		if (this.state.editing === this.props.list._id) {
			return (
				<ListGroupItem>
					<FormGroup bsClass="form-group editField">
						<FormControl
							type="text"
							ref="nameInput"
							defaultValue={this.props.list.name}
							onKeyDown={(event) => this.handleEditList(event)} />
					</FormGroup>
				</ListGroupItem>
			);
		} else {
			return (
				<ListGroupItem className={(this.props.list._id == this.props.selectedItemId) ? 'active' : ''}
					onClick={() => this.props.selectList(this.props.list._id)}>
					{this.props.list.name}
					<Label bsStyle="info" className="pushRight label-counter">{this.props.countPendingTasks}</Label>
					<Glyphicon className="pushRight red"
						onClick={() => this.deleteThisList()}
						glyph="glyphicon glyphicon-remove" />					
					<Glyphicon className="pushRight orange"
						onClick={() => this.toggleEditing()}
						glyph="glyphicon glyphicon-edit" />
				</ListGroupItem>
			);

		}
	}
}
 
List.propTypes = propTypes;

export default List;