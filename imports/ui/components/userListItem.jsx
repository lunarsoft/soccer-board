import React, {Component, PropTypes} from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export default class UserListItem extends Component {

  render() {
    return (
      <ListItem
        primaryText = {this.props.name}
        leftAvatar = {
          <Avatar
            src = {this.props.avatar}
          />
        }
      />
    );
  }
}


UserListItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
