export default class RoundRobin {
  static get playersLimit() {
    return 10;
  }

  static get tournamentName() {
    return 'Round-robin tournament';
  }

  constructor(players) {
    this.status = 'open';
    this.players = players;
  }
}
