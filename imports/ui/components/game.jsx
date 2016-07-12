import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class Game extends Component {
  constructor(props) {
    super(props);
  }

  handleJoin() {
    Meteor.call('games.join', this.props.game._id);
  }

  handleRemove() {
    Meteor.call('games.remove', this.props.game._id);
  }

  handleWin() {
    Meteor.call('games.updatePlayerStatus', this.props.game._id, Meteor.userId(), 'win');
  }
  handleTie() {
    Meteor.call('games.updatePlayerStatus', this.props.game._id, Meteor.userId(), 'tie');
  }
  handleDefeat() {
    Meteor.call('games.updatePlayerStatus', this.props.game._id, Meteor.userId(), 'defeat');
  }

  render() {
    const players = this.props.game.players.map(player => player.username);
    const subtitle = players.reduce((a,b,c) => {
      if (players.length <= 2 || c === 2) {
        return a + ' vs ' + b;
      }
      return a + ' ' + b;
    });
    const actions = [];
    if (Meteor.user()) {
      if (players.length < 2) {
        if (this.props.game.createdById === Meteor.userId()) {
          actions.push(<RaisedButton
            key = {1}
            primary = {true}
            label = "Remove"
            onTouchTap = {this.handleRemove.bind(this)}
          />);
        } else {
          actions.push(<RaisedButton
            key = {1}
            primary = {true}
            label = "Join"
            onTouchTap = {this.handleJoin.bind(this)}
          />);
        }
      } else {
        const player1 = this.props.game.players.find(player => player._id === Meteor.userId());
        const player2 = this.props.game.players.find(player => player._id !== Meteor.userId());

        if (player1 !== undefined && player2 !== undefined) {
          if (player1.status === '') {
            actions.push(
              <RaisedButton
                key = {1}
                primary = {true}
                label = "Win"
                onTouchTap = {this.handleWin.bind(this)}
              />,
              <RaisedButton
                key = {2}
                label = "Tie"
                onTouchTap = {this.handleTie.bind(this)}
              />,
              <RaisedButton
                key = {3}
                secondary = {true}
                label = "Defeat"
                onTouchTap = {this.handleDefeat.bind(this)}
              />
            );
          } else if (player2.status === '') {
            actions.push(
              <div
                key = {1}>Waiting for {player2.username}.</div>
            );
          } else {
            actions.push(
              <div
                key = {1}>You {player1.status} this match.</div>
            );
          }
        }
      }
    }

    return (
      <Card
        expanded = {false}>
        <CardHeader
          title = {this.props.game.name}
          subtitle = {subtitle}
        />
        <CardActions>
          {actions}
        </CardActions>
      </Card>
    );
  }
}
