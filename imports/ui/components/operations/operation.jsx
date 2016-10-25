import React, { Component, PropTypes } from 'react';
import { Label, Button, Glyphicon } from 'react-bootstrap';
import { deleteOperation } from '../../../api/operations/methods.js'

const propTypes = {
	operation: PropTypes.object.isRequired,
};

class Operation extends Component {

	deleteThisOperation() {
		deleteOperation.call({ 
			_id: this.props.operation._id,
		}, (error) => {
 			if (error) {
 				console.log(error);
 			} else { }
 		});
	}

	stylizeFrequencyLabel(frequency) {
		switch(frequency) {
			case "daily": return "success";
			case "weekly": return "warning"
			case "monthly": return "info";
			case "yearly": return "danger";
		}
	}

	render() {
		return (
			<tr>
				<td className="vert-align">
					<strong>{this.props.operation.name}</strong><br/>
					{this.props.operation.description}
				</td>
				<td className="vert-align col-sm-1 col-md-1 col-lg-1 text-center">
					{this.props.operation.amount} €
				</td>
				<td className="col-sm-1 col-md-1 col-lg-1 text-center">
					<Label className="frequency-label" bsStyle={this.stylizeFrequencyLabel(this.props.operation.frequency)}>
						{this.props.operation.frequency}
					</Label>
				</td>
				<td className="vert-align col-sm-1 col-md-1 col-lg-1 text-right">
	    			<Button bsStyle="danger" className="btn-sm" onClick={() => this.deleteThisOperation()}>
						<Glyphicon glyph="glyphicon glyphicon-remove" />
					</Button>
				</td>
			</tr>
		);
	}
}

Operation.propTypes = propTypes;

export default Operation;