import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Users} from './Users';

export const Groups = new Mongo.Collection('games', {
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

if (Meteor.isServer) {
  Meteor.publish('games', function () {
    return Groups.find({});
  });

}
