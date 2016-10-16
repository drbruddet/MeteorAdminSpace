import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// containers
import AppContainer from '../../ui/containers/AppContainer.jsx'
import MainContainer from '../../ui/containers/MainContainer.jsx'
import AdminAppContainer from '../../ui/containers/AdminAppContainer.jsx'
import AdminMainContainer from '../../ui/containers/AdminMainContainer.jsx'

// pages
import LoginPage from '../../ui/pages/LoginPage.jsx'
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx'

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Route path="login" component={LoginPage}/>
		<Route path="/" component={AppContainer}>
      		<IndexRoute component={MainContainer}/>
    	</Route>
		<Route path="/admin" component={AdminAppContainer}>
      		<IndexRoute component={AdminMainContainer}/>
    	</Route>
    	<Route path="*" component={NotFoundPage}/>
	</Router>
);