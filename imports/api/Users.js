import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export const Users = Meteor.users;

if (Meteor.isServer) {
  Meteor.publish('users', function () {
    return Users.find({}, {fields: {rating: 1, tau: 1, vol: 1, rd: 1, avatar: 1}});
  });

}

Meteor.methods({
  'users.updateRanking'(userId, rating, rd, vol) {
    check(userId, String);

    Users.update(userId, {$set: {rating, rd, vol}});
  }
});
