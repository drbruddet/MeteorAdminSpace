import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// containers
import AppContainer from '../../ui/containers/AppContainer.jsx'
import MainContainer from '../../ui/containers/MainContainer.jsx'
import AdminAppContainer from '../../ui/containers/AdminAppContainer.jsx'
import AdminMainContainer from '../../ui/containers/AdminMainContainer.jsx'
import TasksContainer from '../../ui/containers/TasksContainer.jsx'

// pages
import LoginPage from '../../ui/pages/LoginPage.jsx'
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx'
import BudgetPage from '../../ui/pages/admin/BudgetPage.jsx'
import TodosPage from '../../ui/pages/admin/TodosPage.jsx'

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Route path="login" component={LoginPage}/>
		<Route path="/" component={AppContainer}>
      		<IndexRoute component={MainContainer}/>
    	</Route>
		<Route path="/admin" component={AdminAppContainer}>
      		<IndexRoute component={AdminMainContainer}/>
      		<Route path="budget" component={BudgetPage}/>
          <Route path="todos" component={TasksContainer}>
            <Route path=":listId" component={TodosPage}/>
          </Route>
    	</Route>
    	<Route path="*" component={NotFoundPage}/>
	</Router>
);