import React, { Component, PropTypes } from 'react';

class AppContainer extends Component {
	render(){
		return (
			<div>
				<p>Menu non connecté</p>
				{this.props.children}
			</div>
		);
	}
}

export default AppContainer;