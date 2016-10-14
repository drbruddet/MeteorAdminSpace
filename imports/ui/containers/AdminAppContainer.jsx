import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

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
			<div>
				<p>Ici le menu admin une fois connecté</p>
				<a href="#" onClick={this.logout}>Logout</a>
				{this.props.children}
			</div>
		);
	}
}

export default AdminAppContainer;
