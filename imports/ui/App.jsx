import React, {Component} from 'react';
import {Link} from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import AccountUIWrapper from './AccountUIWrapper';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      notificationPanel: false
    };
  }

  handleMenuPanelToggle() {
    this.setState({open: !this.state.open});
  }
  handleNotificationPanelToggle() {
  // this.setState({notificationPanel: !this.state.notificationPanel});
  }

  render() {
    return (
      <div>
        <AppBar
          title = "Football"
          // iconClassNameRight = "muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap = {this.handleMenuPanelToggle.bind(this)}
          // onRightIconButtonTouchTap = {this.handleNotificationPanelToggle.bind(this)}
          iconElementRight = {
            <IconButton
              onTouchTap = {this.handleNotificationPanelToggle.bind(this)}>
              <NotificationsIcon/>
            </IconButton>
            }
        />
        <AccountUIWrapper/>
        {this.props.children}
        <Drawer
          docked = {false}
          open = {this.state.notificationPanel}
          onRequestChange = {this.handleNotificationPanelToggle.bind(this)}
          openSecondary = {true}>
          <AppBar
            title = "Notifications"
            showMenuIconButton = {false}
            onTitleTouchTap = {this.handleNotificationPanelToggle.bind(this)}
          />
          <Card
            expanded = {false}>
            <CardHeader
              title = "Jan Limonka"
              subtitle = "Game invitation"
              avatar = "http://lorempixel.com/100/100/nature/"
            />
            <CardActions>
              <RaisedButton
                primary = {true}
                label = "Join"
              />
              <RaisedButton
                secondary = {true}
                label = "Reject"
              />
            </CardActions>
          </Card>
          <Card
            expanded = {false}>
            <CardHeader
              title = "Alfons Stalin"
              subtitle = "Game invitation"
              avatar = "http://lorempixel.com/100/100/nature/"
            />
            <CardActions>
              <RaisedButton
                primary = {true}
                label = "Join"
              />
              <RaisedButton
                secondary = {true}
                label = "Reject"
              />
            </CardActions>
          </Card>
          <Card
            expanded = {false}>
            <CardHeader
              title = "Adolf Testowy"
              subtitle = "Game invitation"
              avatar = "http://lorempixel.com/100/100/nature/"
            />
            <CardActions>
              <RaisedButton
                primary = {true}
                label = "Join"
              />
              <RaisedButton
                secondary = {true}
                label = "Reject"
              />
            </CardActions>
          </Card>
        </Drawer>

        <Drawer
          docked = {false}
          open = {this.state.open}
          onRequestChange = {this.handleMenuPanelToggle.bind(this)}>
          <AppBar
            title = "Football"
            showMenuIconButton = {false}
            onTitleTouchTap = {this.handleMenuPanelToggle.bind(this)}
          />
          <Link
            to = "/games">
            <MenuItem
              onTouchTap = {this.handleMenuPanelToggle.bind(this)}>
              Games
            </MenuItem>
          </Link>
          <Link
            to = "/tournaments">
            <MenuItem
              onTouchTap = {this.handleMenuPanelToggle.bind(this)}>
              Tournaments
            </MenuItem>
          </Link>
          <Link
            to = "/ranking">
            <MenuItem
              onTouchTap = {this.handleMenuPanelToggle.bind(this)}>
              Ranking
            </MenuItem>
          </Link>
          <Link
            to = "/users">
            <MenuItem
              onTouchTap = {this.handleMenuPanelToggle.bind(this)}>
              Users
            </MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}
