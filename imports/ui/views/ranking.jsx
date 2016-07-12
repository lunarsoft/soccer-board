import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import {createContainer} from 'meteor/react-meteor-data';
import UserRanking from '../components/userRanking';

import {Users} from '../../api/Users';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hidden: false,
      dialogOpen: false
    };
  }

  render() {
    return (
      <Card>
        <CardTitle
          title = "Ranking:"
        />
        <CardText>
          <List>
            {
              this.props.users.map((user, key) =>
                <UserRanking
                  key = {key}
                  user = {user}
                />
              )
            }
          </List>
        </CardText>
      </Card>
    );
  }
}
export default createContainer(() => {
  Meteor.subscribe('users');

  return {
    users: Users.find({}, {sort: {rating: -1}}).fetch(),
    currentUser: Meteor.user()
  };
}, Ranking);
