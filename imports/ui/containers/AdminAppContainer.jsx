import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'

import AdminHeader from '../layouts/AdminHeader.jsx'

class AdminAppContainer extends Component {
	constructor(props){
		super(props);
		this.state = this.getMeteorData();
		this.logout = this.logout.bind(this);
		this.sortTasks = this.sortTasks.bind(this);
	}

	getMeteorData(){
		return { 
			isAuthenticated: Meteor.userId() !== null, 
			sorting: { createdAt: -1 },
		};
	}

	sortTasks(sorting) {
		this.setState({ sorting: sorting });
	}

	componentWillMount() {
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
		console.log("tarte");
		Meteor.logout();
		browserHistory.push('/login');
	}

	render(){
		const childrenWithProps = React.Children.map(this.props.children, (child) => 
			React.cloneElement(child, {
				sorting: this.state.sorting,
				sortTasks: this.sortTasks.bind(this),
			})
		);
		return (
			<div>
				<AdminHeader clickLogout={this.logout}/>
				<div className="app-container">
					{childrenWithProps}
				</div>
			</div>
		);
	}
}

export default AdminAppContainer;
