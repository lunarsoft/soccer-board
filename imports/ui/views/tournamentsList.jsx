import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {createContainer} from 'meteor/react-meteor-data';

import {Tournaments} from '../../api/Tournaments';

class TournamentsList extends Component {
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
          title = "Tournaments:"
        />
        <CardText>
          {this.props.tournaments.map((tournament, key) =>
            <Card
              key = {key}
              expanded = {false}>
              <CardHeader
                title = {tournament.name}
                subtitle = {tournament.players.map(() => {})}
              />
              <CardActions>
                <div> You:</div>
                <RaisedButton
                  primary = {true}
                  label = "Win"
                />
                <RaisedButton
                  label = "Tie"
                />
                <RaisedButton
                  secondary = {true}
                  label = "Defeat"
                />
              </CardActions>
            </Card>
          )}
        </CardText>
      </Card>
    );
  }
}
export default createContainer(() => {
  Meteor.subscribe('tournaments');

  return {
    tournaments: Tournaments.find({}).fetch(),
    currentUser: Meteor.user()
  };
}, TournamentsList);
