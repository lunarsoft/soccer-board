import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Users} from './Users';

export const Tournaments = new Mongo.Collection('tournaments', {
  transform: doc => {
    doc.createdBy = Users.findOne({
      _id: doc.createdById
    });
    return doc;
  }
});


if (Meteor.isServer) {
  Meteor.publish('tournaments', function () {
    return Tournaments.find({});
  });
}

Meteor.methods({
  'tournaments.insert'(name, type) {
    check(name, String);
    check(type, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    if (name.length === 0) {
      throw new Meteor.Error('sss');
    }
    Tournaments.insert({
      createdAt: new Date(),
      name,
      type,
      createdById: this.userId
    });
    console.log(Tournaments.find({}).count());
  },
  'tournaments.remove'(taskId) {
    check(taskId, String);

    const tournament = Tournaments.findOne(taskId);

    if (this.tournament !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    tournament.remove(taskId);
  }
});
