/* global document */
import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import theme from '../imports/ui/theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from '../imports/ui/App.jsx';
import GamesList from '../imports/ui/views/gamesList';
import Ranking from '../imports/ui/views/ranking';
import Home from '../imports/ui/views/home';
import UserList from '../imports/ui/views/userList';
import TournamentsList from '../imports/ui/views/tournamentsList';
import UserDetail from '../imports/ui/views/userDetail';
import '../imports/startup/account-config';

Meteor.startup(() => {
  injectTapEventPlugin();
  render(
    <MuiThemeProvider
      muiTheme = {getMuiTheme(theme)}>
      <Router
        history = {browserHistory}>
        <Route
          path = "/" component = {App}>
          <IndexRoute
            component = {Home}
          />
          <Route
            path = "games" component = {GamesList}
          />
          <Route
            path = "tournaments" component = {TournamentsList}
          />
          <Route
            path = "ranking" component = {Ranking}
          />
          <Route
            path = "users">
            <IndexRoute
              component = {UserList}
            />
            <Route
              path = ":id"
              component = {UserDetail}
            />
          </Route>
        </Route>
      </Router>
    </MuiThemeProvider>, document.getElementById('render-target'));
});
