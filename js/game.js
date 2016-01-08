function Game(opts){
  var options = opts || {};
  this.size = options.size || 5;
  this.highestNumber = options.highestNumber || 4;
  this.goalNumber = 10;

  this.directions = {
    0: {x: 0, y:  -1}, // up
    1: {x: 1, y: 0}, // right
    2: {x: 0, y: 1}, // down
    3: {x: -1, y: 0}  // left
  };

  this.setup();
}

// Set up with new grid of random nubmers
Game.prototype.setup = function(){
  this.grid = new Grid({size: this.size, highestNumber: this.highestNumber});
};

// Check if goal has been reached
Game.prototype.won = function() {
  return this.highestNumber === this.goalNumber;
};

// Game is finished if won or no more cells can be merged
Game.prototype.finished = function(){
  this.won() || !this.mergesAvailable();
};

// Check each tile in grid to see if it can be merged
// TODO: make more efficient by skipping tiles who can be merged with neighbor
// that has already been checked
Game.prototype.mergesAvailable = function(){
  for (var row=0; row<size; row++){
    for (var col=0; col<size; col++){
      if (canMerge(row, col)) return true;
    }
  }
  return false;
};

// Return directions vector
Game.prototype.directionVector = function(dir){
  return this.directions[dir];
};

// Returns value in adjacent cell 
Game.prototype.adjacentCell = function(row, col, dir){
  var vec = directionVector(dir);
  return {
    x: row + vec.x, 
    y: row + vec.y, 
    content: this.grid.cell(row + vec.x, col + vec.y)
  };
};

// Returns true if cell is mergeable, i.e. has adjacent cells with same value
Game.prototype.canMerge = function(row, col){
  var cell = this.grid.cell(row, col);
  for (var dir=0; dir<4; dir++){
    var adjacent = adjacentCell(row, col, dir);
    if (cell === adjacent.content) return true;
  }
  return false;
};

// Merge given cell with any adjacent cells with the same content
Game.prototype.merge = function(row, col, target){

  // Return if can't merge cell
  if (!canMerge(row, col)) return;

  var cell = this.grid.cell(row,col);
  for (var dir=0; dir<4; dir++){
    var adjacent = adjacentCell(row, col, dir);
    if (cell === adjacent.content) { 
      this.merge(adjacent.x, adjacent.y);
    }
  }

  // Replace cell content
  if (!target){
    this.grid.replaceWithRandom(row, col, highestNumber);
  } else {
    this.grid.setCell(row, col, cell+1);
    if (cell+1 > this.highestNumber) this.highestNumber = cell+1;
  }

};