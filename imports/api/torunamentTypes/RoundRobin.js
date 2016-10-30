export default class RoundRobin {
  static get playersLimit() {
    return 4;
  }

  static get tournamentName() {
    return 'Round-robin tournament';
  }

  constructor(players) {
    this.status = 'open';
    this.players = players;
  }

  getMatches() {
    return this.players.reduce((result, player1, index) => {
      for (let i = index + 1; i < this.players.length; i += 1) {
        const player2 = this.players[i];

        if (player1 !== player2) {
          result.push([player1, player2]);
        }
      }
      return result;
    }, []);
  }
}
