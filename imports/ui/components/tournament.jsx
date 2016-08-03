import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

export default class Tournament extends Component {
  constructor(props) {
    super(props);
  }

  handleJoinTap() {
    Meteor.call('tournaments.join', this.props.id);
  }

  render() {
    const actions = [];
    if (!this.props.playersId.includes(Meteor.userId())) {
      actions.push(
        <RaisedButton
          key = {0}
          secondary = {true}
          onTouchTap = {this.handleJoinTap.bind(this)}
          label = "Join"
        />
      );
    }
    return (
      <Card
        expanded = {false}>
        <CardHeader
          title = {<Link
            to = {'/tournaments/' + this.props.id}>{this.props.name}</Link>}
          subtitle = {'Participants: ' + this.props.players.reduce((result, player) => {
            result = result + player.username + ', ';
            return result;
          }, '')}
        />
        <CardActions>
          {actions}
        </CardActions>
      </Card>
    );
  }
}
