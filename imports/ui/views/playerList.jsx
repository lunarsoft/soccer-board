import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/chevron-right';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const rightIconMenu = (
  <IconButton
    tooltip = "Send invite to game."
    tooltipPosition = "bottom-left">
    <MoreVertIcon
      color = {grey400}
    />
  </IconButton>
);

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false
    };
  }

  render() {
    return (
      <Card>
        <CardTitle
          title = "Players list"
        />
        <CardText>
          <List>
            <ListItem
              primaryText = "Adolf"
              leftAvatar = {
                <Avatar
                  src = "images/ok-128.jpg"
                />
              }
              rightIconButton = {rightIconMenu}
              secondaryText = {
                <p>
                  Scores: 1213123
                </p>
              }
              secondaryTextLines = {1}
            />
            <ListItem
              primaryText = "Janek"
              leftAvatar = {
                <Avatar
                  src = "images/kolage-128.jpg"
                />
              }
              rightIconButton = {rightIconMenu}
              secondaryText = {
                <p>
                  Scores: 1213123
                </p>
              }
              secondaryTextLines = {1}
            />
            <ListItem
              primaryText = "Testowy"
              leftAvatar = {
                <Avatar
                  src = "images/uxceo-128.jpg"
                />
              }
              rightIconButton = {rightIconMenu}
              secondaryText = {
                <p>
                  Scores: 1213123
                </p>
              }
              secondaryTextLines = {1}
            />
          </List>
        </CardText>
      </Card>
    );
  }
}
