function Game(opts){
  var options = opts || {};
  var gridSize = options.size || 5;
  this.highestNumber = options.highestNumber || 4;
  this.goalNumber = 10;
  var state = options.state;

  this.directions = {
    0: {x: 0, y:  -1}, // up
    1: {x: 1, y: 0}, // right
    2: {x: 0, y: 1}, // down
    3: {x: -1, y: 0}  // left
  };

  this.setup(gridSize, state);
}

// Set up with new grid of random nubmers
Game.prototype.setup = function(gridSize, state){
  this.grid = new Grid({size: gridSize, highestNumber: this.highestNumber, state: state});
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
Game.prototype.mergesAvailable = function(){
  this.grid.eachCell(function (row, col) {
    if (canMerge(row, col)) return true;
  });
  return false;
};

// Return directions vector
Game.prototype.directionVector = function(dir){
  return this.directions[dir];
};

// Returns value in adjacent cell 
Game.prototype.adjacentCell = function(row, col, dir){
  var vec = this.directionVector(dir);
  var newRow = row + vec.y;
  var newCol = col + vec.x;
  if (!this.grid.outOfBounds(newRow, newCol)){
    return {
      x: newRow, 
      y: newCol, 
      content: this.grid.cell(newRow, newCol)
    };
  }
};

// Returns true if cell is mergeable, i.e. has adjacent cells with same value
Game.prototype.canMerge = function(row, col){
  var cell = this.grid.cell(row, col);
  for(var dir=0; dir<4; dir++){
    var adjacent = this.adjacentCell(row, col, dir);
    if (!adjacent) continue;
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