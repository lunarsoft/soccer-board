import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import UserListItem from '../components/userListItem';
import {createContainer} from 'meteor/react-meteor-data';
import {List} from 'material-ui/List';

import {Users} from '../../api/Users';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      hidden: false
    };
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle
            title = "User list"
          />
          <CardText>
            <List>
              {
                this.props.users.map((user, key) =>
                  <UserListItem
                    key = {key}
                    id = {user._id}
                    name = {user.username}
                    avatar = {user.avatar}
                  />
                )
              }
            </List>
          </CardText>
        </Card>
      </div>
    );
  }
}
export default createContainer(() => {
  Meteor.subscribe('users');

  return {
    users: Users.find({}, {sort: {username: 1}}).fetch()
  };
}, Home);
