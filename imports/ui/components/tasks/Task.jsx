import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Checkbox, ButtonGroup, Button, Glyphicon, Label, 
		OverlayTrigger, Popover, FormGroup, FormControl } from 'react-bootstrap'

import './Task.styl'

const propTypes = {
	task: PropTypes.object.isRequired,
};

class Task extends Component {

	constructor(props) {
		super(props);
		this.state = { editing: null };
	}

	toggleEditing() {
		this.setState({ editing: this.props.task._id });
	}

	priorityLabel() {
		switch (this.props.task.priority) {
			case 'normal': return "success";
			case 'important': return "warning";
			case 'urgent': return "danger";
		}
	}

	dateFormate(time) {
 		return ((moment().unix() - moment(time).unix()) < 3600) ? 
 			moment(time).fromNow() : moment(time).format("DD / MM / YYYY HH:mm");
	}

	toggleChecked() {
		// Set the checked property to the opposite of its current value
		Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
	}

	deleteThisTask() {
		Meteor.call('tasks.remove', this.props.task._id);
	}

	handleEditItem() {
		const taskId = this.state.editing;
		const updatedText = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
		const priority = ReactDOM.findDOMNode(this.refs.priorityInput).value.trim();

		Meteor.call('tasks.updateTask', taskId, updatedText, priority, (error, response) => {
			if (!error) {
				this.setState({ editing: null });
        	} else {
        		// Message Task Updated
        	}
		});
	}

	render() {
		const taskClassName = this.props.task.checked ? 'success' : '';

		const popoverHoverFocus = (
			<Popover id="popover-trigger-hover-focus" title="Informations">
				<strong>Created: </strong>{this.dateFormate(this.props.task.createdAt)}
			</Popover>
		);

		if (this.state.editing === this.props.task._id) {
			return (
				<tr>
            		<td className="inline-my-form" colSpan="12">
            			<FormGroup className="form-group col-xs-12 col-sm-7 no-padding">
							<FormControl
								className="form-control input-group-lg reg_name col-xs-12 col-sm-10"
								type="text"
								ref="textInput"
								defaultValue={this.props.task.text}
							/>
						</FormGroup>
						<FormGroup className="form-group col-xs-9 col-sm-3 no-padding">
							<FormControl 
								componentClass="select"
								className="form-control input-group-lg reg_name col-md-3"
								defaultValue={this.props.task.priority}
								ref="priorityInput">
								<option value="normal">Normal</option>
								<option value="important">Important</option>
								<option value="urgent">Urgent</option>
							</FormControl>
						</FormGroup>
	            		<FormGroup className="form-group col-xs-3 col-sm-2 no-padding">
            				<Button className="btn btn-primary form-control input-group-lg reg_name col-xs-12 col-sm-2" 
            					onClick={() => this.handleEditItem()}>Update</Button>
            			</FormGroup>
            		</td>
        		</tr>
        	);
		} else {
			return (
				<tr className={taskClassName}>
					<td className="vert-align condensed">
						<Checkbox
							readOnly
							checked={this.props.task.checked}
							onClick={() => this.toggleChecked()}
						/>
					</td>
					<td className="vert-align col-sm-1 col-md-1 col-lg-1">
						<Label bsStyle={this.priorityLabel()}>
							{this.props.task.priority}
						</Label>
					</td>
					<td className="vert-align">
						{this.props.task.text}
					</td>
					<td className="vert-align col-sm-2 col-md-2 col-lg-2 text-right">
						<ButtonGroup>
							<Button className="btn-sm">
	    						<OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
									<Glyphicon glyph="glyphicon glyphicon-info-sign" />
								</OverlayTrigger>
							</Button>
							<Button bsStyle="warning" className="btn-sm" onClick={() => this.toggleEditing()}>
								<Glyphicon glyph="glyphicon glyphicon-edit" />
							</Button>
	    					<Button bsStyle="danger" className="btn-sm" onClick={() => this.deleteThisTask()}>
								<Glyphicon glyph="glyphicon glyphicon-remove" />
							</Button>
	  					</ButtonGroup>
					</td>
				</tr>
			);
	 	}	
	}
}
 
Task.propTypes = propTypes;

export default Task;