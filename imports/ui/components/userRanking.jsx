import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class UserRanking extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.user);
    return (
      <ListItem
        leftAvatar = {
          <Avatar
            src = "images/ok-128.jpg"
          />
        }
        primaryText = {this.props.user.username}
        secondaryText = {Math.round(this.props.user.rating)}
      />
    );
  }
}
