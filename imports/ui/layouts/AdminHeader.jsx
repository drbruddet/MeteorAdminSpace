import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

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
							<IndexLinkContainer to="/admin">
								<NavItem>Home</NavItem>
							</IndexLinkContainer>
							<LinkContainer to="/admin/budget">
								<NavItem>Budget</NavItem>
							</LinkContainer>
							<LinkContainer to="/admin/tasks">
								<NavItem>Todos</NavItem>
							</LinkContainer>
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