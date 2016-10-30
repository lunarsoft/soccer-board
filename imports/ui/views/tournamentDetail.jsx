import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import Spinner from 'react-spinkit';
import {createContainer} from 'meteor/react-meteor-data';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {Tournaments} from '../../api/Tournaments';

const style = {
  margin: 'auto'
};

class TournamentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false
    };
  }

  handleStartTournament() {
    Meteor.call('tournaments.start', this.props.tournament._id);
  }

  render() {
    if (this.props.tournament === undefined) {
      return (
        <Card>
          <Spinner
            spinnerName = 'cube-grid'
            style = {style}
          />
        </Card>);
    }
    console.log(this.props.tournament)
    return (
      <Card>
        <CardTitle
          title = {this.props.tournament.name}
          subtitle = {'Status of the tournament: ' + this.props.tournament.status}
        />
        <CardText>
          <p>Ready to start: {this.props.tournament.isReady.toString()}</p>
          <RaisedButton
            secondary = {true}
            onTouchTap = {this.handleStartTournament.bind(this)}
            label = "Start Tournament"
          />
          <p>{'Player list: ' + this.props.tournament.players.reduce((result, user, index) => {
            if (index !== 0) {
              result += ', ';
            }
            result += user.username;

            return result;
          }, '')}</p>
        </CardText>
      </Card>
    );
  }
}

export default createContainer(data => {
  Meteor.subscribe('tournaments');

  return {
    tournament: Tournaments.findOne(data.params.id),
    currentUser: Meteor.user()
  };
}, TournamentDetail);
