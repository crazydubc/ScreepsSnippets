//TO USE
//requires the following (or edit the code)
//Structure Memory https://github.com/screepers/screeps-snippets/blob/master/src/misc/JavaScript/OwnedStructure%20Memory.js
//Structure Caching https://github.com/screepers/screeps-snippets/blob/master/src/prototypes/JavaScript/Room/prototype.Room.structures.js
//Call this.ActiveBuildingCache() on each owned room each tick to refrech the cache
//Use this.EnergyCapacityAvailable instead of this.energyCapacityAvailable until the bug is fixed

//all structures are active at RCL 8.. return true Thanks Tigga!
const isActive = OwnedStructure.prototype.isActive;
OwnedStructure.prototype.isActive = function() {
    if (!this.room.my) return false //out ours
	if (!this.my) return false //out ours
	if (this.structureType === STRUCTURE_CONTAINER || this.structureType === STRUCTURE_ROAD) return true //always true for these
    if (this.room.controller.level === MAX_RCL) {
        return true;
    }
    if (!this.memory.active) this.memory.active = isActive.call(this); //initialize
	return this.memory.active
}

//call this each tick on owned rooms to refresh the active cache
Room.prototype.ActiveBuildingCache = function() {
    //level didn't change
    if (!this || !this.my) return false
    if (this.memory.currentlevel === this.controller.level) return true 
	
    //decreased level.. Need to recalc what is active and what isn't
    const mystructures = this.find(FIND_MY_STRUCTURES) //get all structures
    if (this.controller.level > this.memory.currentlevel) {
        //increased 
        _.forEach(mystructures, s => {if (!s.memory.active) { delete s.memory.active} })
    } else {
        //decreased
        _.forEach(mystructures, s => delete s.memory.active)
    }
    this.memory.currentlevel = this.controller.level //set the new RCL
    
    return true
}

//requires structure cache...or just get all your spawns and extensions in the room
//This fixes a known bug that energyCapacityAvailable has in it.
//https://github.com/screepers/screeps-snippets/blob/master/src/prototypes/JavaScript/Room/prototype.Room.structures.js
Object.defineProperty(Room.prototype, 'EnergyCapacityAvailable', {
    get: function() {
        if (!this._energyCapacityAvailable) {
            this._energyCapacityAvailable = 0;
            _.forEach(this.extensions.concat(this.spawns), c => { //for each spawn and extension
                if (c.isActive()) { //cached isActive() function for CPU savings
                    this._energyCapacityAvailable += c.store.getCapacity(RESOURCE_ENERGY) //add the energy to the max
                }
            })
        }
        return this._energyCapacityAvailable
    },
	configurable: true,
})