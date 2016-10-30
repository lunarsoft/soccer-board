import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Tournament} from './Schemas'
import {Users} from './Users';
import {getTournamentClass, isTypeExist} from './torunamentTypes/tournamentTypes';

export const Tournaments = new Mongo.Collection('tournaments', {
  transform: doc => {
    doc.createdBy = Users.findOne({
      _id: doc.createdById
    });
    doc.players = doc.playersId.map(id => Users.findOne({
      _id: id
    }));
    doc.isReady = doc.playersId.length === getTournamentClass(doc.typeId).playersLimit;

    return doc;
  }
});

Tournaments.attachSchema(Tournament);

if (Meteor.isServer) {
  Meteor.publish('tournaments', function () {
    return Tournaments.find({});
  });
}

Meteor.methods({
  'tournaments.insert'(name, type) {
    check(name, String);
    check(type, Number);

    if (!isTypeExist(type)) {
      throw new Meteor.Error('tournament-type-incorrect');
    }
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if (name.length === 0) {
      throw new Meteor.Error('sss');
    }
    Tournaments.insert({
      createdAt: new Date(),
      name,
      typeId: type,
      status: 'open',
      createdById: this.userId,
      playersId: []
    }, (error, result) => {
      console.log(error, result);
    });
  },
  'tournaments.join'(tournamentId) {
    check(tournamentId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const tournament = Tournaments.findOne(tournamentId);

    if (tournament === undefined) {
      throw new Meteor.Error('wrong-id');
    }

    if (tournament.status !== 'open') {
      throw new Meteor.Error('tournament-closed');
    }

    if (tournament.playersId.length >= getTournamentClass(tournament.typeId).getTournamentClass) {
      throw new Meteor.Error('tournament-full');
    }

    if (tournament.playersId.indexOf(this.userId) !== -1) {
      throw new Meteor.Error('cannot-join');
    }

    Tournaments.update(tournamentId, {$push: {
      playersId: this.userId,
    }});
  },
  'tournaments.remove'(taskId) {
    check(taskId, String);

    const tournament = Tournaments.findOne(taskId);

    if (this.tournament !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    tournament.remove(taskId);
  },
  'tournaments.start'(tournamentId) {
    check(tournamentId, String);

    const tournament = Tournaments.findOne(tournamentId);
    const TournamentClass = getTournamentClass(tournament.typeId);

    const tournamentObject = new TournamentClass(tournament.playersId)
    tournamentObject.getMatches().forEach(match => {
      console.log(match)
      Meteor.call('games.insert', 'Tournament ' + tournament.name + ' game', tournament._id, match);
    });
  }

});
