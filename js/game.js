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
  return this.won() || !this.mergesAvailable();
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
      x: newCol, 
      y: newRow, 
      value: this.grid.cell(newRow, newCol)
    };
  }
};

// Returns true if cell is mergeable, i.e. has adjacent cells with same value
Game.prototype.canMerge = function(row, col){
  var cell = this.grid.cell(row, col);
  for(var dir=0; dir<4; dir++){
    var adjacent = this.adjacentCell(row, col, dir);
    if (!adjacent) continue;
    if (cell === adjacent.value) return true;
  }
  return false;
};

Game.prototype.cellInArray = function(cell, arr){
  for (var c=0; c<arr.length; c++){
    if (cell.x === arr[c].x && cell.y === arr[c].y) return true;
  }
  return false;
};

// Merge given cell with any adjacent cells with the same value
// and increment the value of the new merged cell
Game.prototype.merge = function(row, col){
  if (!this.canMerge(row, col)) return;
  var selectedCell = {  x: col,
                        y: row,
                        value: this.grid.cell(row,col)
                      };

  var newVal = selectedCell.value + 1;
  if (newVal > this.highestNumber) this.highestNumber = newVal;

  for (var c=0; c < mergeable.cells.length; c++){
    var cell = mergeable.cells[c];
    if (cell === mergeable.target){
      this.grid.setCell(cell.y, cell.x, newVal);
    } else {
      this.grid.replaceWithRandom(cell.y, cell.x, this.highestNumber);
    }
  }
};

// Recursively get cells that can be merged with the passed cell
Game.prototype.getMergeable = function(cell, mergeable){
  var mergeable = mergeable || { cells: [],
                                  target: cell
                                };
  if (cell.value === mergeable.target.value){
    mergeable.cells.push(cell);
  } else {
    return;
  }
  for(var dir=0; dir<4; dir++){
    var adjacent = this.adjacentCell(cell.y, cell.x, dir);
    if (!adjacent) continue;
    if (this.cellInArray(adjacent, mergeable.cells)) continue;

    if (mergeable.target.value === adjacent.value){
      if (adjacent.x === mergeable.target.x && adjacent.y > mergeable.target.y){
        mergeable.target = adjacent;
      };
      mergeable.cells.concat(this.getMergeable(adjacent, mergeable));
    }
  }
  return mergeable;
};