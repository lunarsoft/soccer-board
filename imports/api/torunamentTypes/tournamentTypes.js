import RoundRobin from './RoundRobin';

const tournamentTypes = [
  {
    _id: 1,
    name: RoundRobin.tournamentName,
    playersLimit: RoundRobin.playersLimit,
    tournamentClass: RoundRobin
  }
];

export function getTournamentTypes() {
  return tournamentTypes.map(type => {
    return {
      _id: type._id,
      name: type.name
    };
  });
}

export function isTypeExist(id) {
  return Boolean(tournamentTypes.find(type => type._id === id));
}

export function getTournamentClass(id) {
  const tournamentType = tournamentTypes.find(type => type._id === id);

  if (tournamentType === undefined) {
    console.log('error');
  }

  return tournamentType.tournamentClass;
}
