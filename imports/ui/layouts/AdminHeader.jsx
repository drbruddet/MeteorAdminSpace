import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class AdminHeader extends Component {

	render(){

		return (
			<div>
				<Navbar fixedTop fluid>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/admin">Admin Dashboard</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<LinkContainer to="/admin">
								<NavItem>Home</NavItem>
							</LinkContainer>
							<NavItem href="#">Budget</NavItem>
							<NavItem href="#">Todos</NavItem>
							<NavItem href="#">Notes</NavItem>
						</Nav>
						<Nav pullRight>
							<NavItem onClick={this.props.clickLogout}>Logout</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default AdminHeader;