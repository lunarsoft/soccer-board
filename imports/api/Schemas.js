import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Game = new SimpleSchema({
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  },
  createdById: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  closedAt: {
    type: String,
    optional: true
  },
  players: {
    type: [
      new SimpleSchema({
        userId: {
          type: String,
          regEx: SimpleSchema.RegEx.Id
        },
        status: {
          type: String,
          defaultValue: ''
        }
      })
    ]
  },
  tournamentId: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id
  },
  state: {
    type: String,
    defaultValue: 'open'
  },
});

export const Tournament = new SimpleSchema({
  name: {
    type: String
  },
  typeId: {
    type: Number
  },
  createdById: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  },
  winner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  playersId: {
    type: [String],
    defaultValue: []
  },
  status: {
    type: String,
    defaultValue: 'Open'
  }
});

export const Group = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
    defaultValue: ''
  },
  level: {
    type: Number,
    defaultValue: 0
  }
});
