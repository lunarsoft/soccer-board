import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {createContainer} from 'meteor/react-meteor-data';

import Tournament from '../components/tournament';

import {Tournaments} from '../../api/Tournaments';

const style = {
  position: 'fixed',
  right: 25,
  bottom: 25
};

class TournamentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: false
    };
  }

  render() {
    return (
      <div>
        <Card>
          <CardTitle
            title = "Tournaments:"
          />
          <CardText>
            {this.props.tournaments.map((tournament, key) =>
              <Tournament
                key = {key}
                name = {tournament.name}
                createdBy = {tournament.createdBy.username}
                id = {tournament._id}
                players = {tournament.players}
                playersId = {tournament.playersId}
              />
            )}
          </CardText>
        </Card>
        <Link
          to = "/newTournament">
          <FloatingActionButton
            secondary = {true}
            style = {style}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
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
