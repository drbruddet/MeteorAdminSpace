import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

class NotFoundPage extends Component {

	render(){
		return (
			<div>
				<div className="container">
					404 Not Found
				</div>
			</div>
		);
	}
}

export default NotFoundPage;