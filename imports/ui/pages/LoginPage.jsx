import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

class LoginPage extends Component {
  
	constructor(props){
		super(props);
		this.state = {
			error: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		let email = document.getElementById('login-email').value;
		let password = document.getElementById('login-password').value;
	
		Meteor.loginWithPassword(email, password, (err) => {
	  		if(err){
				this.setState({
		  			error: err.reason
				});
	  		} else {
				browserHistory.push('/admin');
	  		}
		});
	}

	render(){
		const error = this.state.error;

		return (
			<div id="LoginPage">
				{ error.length > 0 ? <div className="alert">{error}</div> :''}
				<form id="login-form" className="form" onSubmit={this.handleSubmit}>
					<input type="email" id="login-email" className="form-control input-lg" placeholder="email"/>
					<input type="password" id="login-password" className="form-control input-lg" placeholder="password"/>
					<input type="submit" id="login-button" className="btn btn-primary btn-lg btn-block" value="Login" />
				</form>
			</div>
		);
	}
}

export default LoginPage;

