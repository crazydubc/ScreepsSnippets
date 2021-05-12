//USAGE Example. Sort by creeps home and role in memeory
//Creeps = recursiveGroupBy(Game.creeps, ['memory.home', 'memory.role']);
//OUTPUT Creeps['W33N33']['helper']


function recursiveGroupBy(seq, keys) {
    if (!keys.length) { return seq; }
    let [ first, ...rest ] = keys;
    return _.mapValues(_.groupBy(seq, first), value => recursiveGroupBy(value, rest));
}