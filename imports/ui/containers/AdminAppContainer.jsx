import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

import AdminHeader from '../layouts/AdminHeader.jsx'

class AdminAppContainer extends Component {
	constructor(props){
		super(props);
		this.state = this.getMeteorData();
		this.logout = this.logout.bind(this);
	}

	getMeteorData(){
		return { isAuthenticated: Meteor.userId() !== null };
	}

	componentWillMount(){
		if (!this.state.isAuthenticated) {
			browserHistory.push('/login');
		}
	}

	componentDidUpdate(prevProps, prevState){
		if (!this.state.isAuthenticated) {
			browserHistory.push('/login');
		}
	}

	logout(e){
		e.preventDefault();
		Meteor.logout();
		browserHistory.push('/login');
	}
	
	render(){
		return (
			<div className="app-container">
				<AdminHeader clickLogout={this.logout}/>
				{this.props.children}
			</div>
		);
	}
}

export default AdminAppContainer;
