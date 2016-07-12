/* globals Accounts */
import {Meteor} from 'meteor/meteor';
import '../imports/api/Tournaments';
import '../imports/api/Games';
import '../imports/api/Users';

Meteor.startup(() => {
  // Generate user initials after Facebook login
  Accounts.onCreateUser((options, user) => {
    user.rating = 1500;
    user.tau = 0.5;
    user.vol = 0.06;
    user.rd = 200;

    // Don't forget to return the new user object at the end!
    return user;
  });
});
