import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Users} from './Users';
import {Glicko2} from 'glicko2';

export const Games = new Mongo.Collection('games', {
  transform: doc => {
    doc.createdBy = Users.findOne({
      _id: doc.createdById
    });

    doc.players.forEach(user => {
      Object.assign(user,
        Users.findOne({
          _id: user.userId
        })
      );
    });

    return doc;
  }
});

const ranking = new Glicko2({
  tau: 0.5,
  rating: 1500,
  rd: 200,
  vol: 0.06
});

if (Meteor.isServer) {
  Meteor.publish('games', function () {
    return Games.find({}, {sort: {createdAt: -1}});
  });
}

Meteor.methods({
  'games.insert'(name, tournamentId) {
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if (name.length === 0) {
      throw new Meteor.Error('name-to-short');
    }

    const game = {
      createdAt: new Date(),
      name,
      players: [
        {
          userId: this.userId,
          status: ''
        }
      ],
      createdById: this.userId
    };
    if (tournamentId !== undefined) {
      game.tournamentId = tournamentId;
    }

    Games.insert(game);
  },
  'games.join'(gameId) {
    check(gameId, String);

    Games.update(gameId, {$push: {
      players: {
        userId: this.userId,
        status: ''
      }
    }});
  },

  'games.updatePlayerStatus'(gameId, userId, status) {
    check(gameId, String);
    check(userId, String);
    check(status, String);

    Games.update({_id: gameId, 'players.userId': userId}, {$set: {'players.$.status': status}});

    const game = Games.findOne(gameId);

    if (game.players.filter(player => player.status !== '').length === game.players.length) {
      const player1 = Users.findOne({
        _id: game.players[0].userId
      });
      const player2 = Users.findOne({
        _id: game.players[1].userId
      });
      const rankingPlayer1 = ranking.makePlayer(player1.rating, player1.rd, player1.vol);
      const rankingPlayer2 = ranking.makePlayer(player2.rating, player2.rd, player2.vol);
      const matches = [];
      matches.push([rankingPlayer1, rankingPlayer2, player1.status === 'win' ? 1 : 0]);
      ranking.updateRatings(matches);

      Meteor.call(
        'users.updateRanking',
        player1._id,
        rankingPlayer1.getRating(),
        rankingPlayer1.getRd(),
        rankingPlayer1.getVol()
      );
      Meteor.call(
        'users.updateRanking',
        player2._id,
        rankingPlayer2.getRating(),
        rankingPlayer2.getRd(),
        rankingPlayer2.getVol()
      );
    }
  },

  'games.remove'(gameId) {
    check(gameId, String);

    const game = Games.findOne(gameId);

    if (game.createdById !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Games.remove(gameId);
  }
});
