import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class UserRanking extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        leftAvatar = {
          <Avatar
            src = {this.props.user.avatar}
          />
        }
        primaryText = {this.props.user.username}
        secondaryText = {Math.round(this.props.user.rating)}
      />
    );
  }
}
