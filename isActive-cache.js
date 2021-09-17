//TO USE
//requires the following (or edit the code)
//Structure Memory https://github.com/screepers/screeps-snippets/blob/master/src/misc/JavaScript/OwnedStructure%20Memory.js
//Call this.ActiveBuildingCache() on each owned room each tick to refrech the cache

//all structures are active at RCL 8.. return true Thanks Tigga!
global.MAX_RCL = _.size(CONTROLLER_STRUCTURES[STRUCTURE_SPAWN])-1; //find the current max RCL for the game.
const isActive = OwnedStructure.prototype.isActive;
//0.003 CPU per call on average
OwnedStructure.prototype.isActive = function() {
    if (!this.room.my) return false //out ours
	if (!this.my) return this.isActive();  
	if (this.structureType === STRUCTURE_CONTAINER || this.structureType === STRUCTURE_ROAD) return true //always true for these
    if (this.room.controller.level === MAX_RCL) {
        delete this.memory.active
        return true;
    }
    if (!this.memory.active) {
        this.memory.active = isActive.call(this); //initialize
    }
	return this.memory.active
}

//call this each tick on owned rooms to refresh the active cache
Room.prototype.ActiveBuildingCache = function() {
    if (!this.my) return false //not your room, asshole
    //level didn't change
    if (this.memory.level === this.controller.level) return true
    
    //changed level.. Need to recalc what is active and what isn't
    const mystructures = this.find(FIND_MY_STRUCTURES) //get all structures
    _.forEach(mystructures, s => delete s.memory.active)
    this.memory.level = this.controller.level //set the new RCL
    
    return true
}