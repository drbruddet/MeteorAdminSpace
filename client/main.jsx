import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import { renderRoutes } from '../imports/startup/client/routes.jsx'

import "./stylesheets/application.styl"

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById('applicationGK'));
});