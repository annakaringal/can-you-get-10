function Game(options){
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
      if (canMerge(row, col) return true;
    }
  }
  return false;
};

// Return directions vector
Game.prototype.directionVector = function(dir){
  return this.directions[dir];
};

Game.prototype.canMerge = function(row, col){
  for (var dir=0; dir<4; dir++){
    var vec = directionVector(dir);
    var cell = this.grid.cell(row, col);
    var adjacent = this.grid.cell(row + vec.x, col + vec.y);

    if (cell === adjacent) return true;
  }
  return false;
}