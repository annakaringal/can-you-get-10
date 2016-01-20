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
    if (this.canMerge(row, col)) return true;
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

  var mergeable = this.getMergeable(selectedCell);
  this.incrementTarget(mergeable.target);
  this.replaceMergeable(mergeable.cells, mergeable.target);
};

// Recursively return cells that can be merged with the passed cell
Game.prototype.getMergeable = function(cell, mergeableCells){
  var mergeable = mergeableCells || { cells: [], target: cell };

  for(var dir=0; dir<4; dir++){
    var adjacent = this.adjacentCell(cell.y, cell.x, dir);
    if (!adjacent) continue;
    if (this.cellInArray(adjacent, mergeable.cells)) continue;

    if (mergeable.target.value === adjacent.value){
      if (adjacent.x === mergeable.target.x && adjacent.y > mergeable.target.y){
        mergeable.target = adjacent;
      } 
      mergeable.cells.push(adjacent);
      mergeable.cells.concat(this.getMergeable(adjacent, mergeable));
    }
  }
  return mergeable;
};

Game.prototype.incrementTarget = function(target){
  var newVal = target.value + 1;
  if (newVal > this.highestNumber) this.highestNumber = newVal;
  this.grid.setCell(target.y, target.x, newVal);
};

Game.prototype.isTarget = function(cell, target){
  if (!cell || !target) return;
  return cell.x === target.x && cell.y === target.y;
};

// Drop any cells above mergeable cells and replace with random number
Game.prototype.replaceMergeable = function(mergeable, target){
  var emptyCells = [];
  var game = this;

  this.grid.eachCell(function(r,c,v){
    var cell = {x: c, y: r, value: v};
    if (this.cellInArray(cell, mergeable) && !this.isTarget(cell, target)){
      var above = {x: c, y: r-1, value: this.grid.cell(r-1, c)};
      if (above.value && above.value !== -1){
        this.grid.setCell(cell.y, cell.x, above.value);
        this.grid.setCell(above.y, above.x, -1);
        emptyCells.push(above);
      } else{
        this.grid.setCell(cell.y, cell.x, -1);
        emptyCells.push({y: cell.y, x: cell.x});
      }
    }
  }.bind(this));

  emptyCells.forEach(function(cell){
    this.grid.replaceWithRandom(cell.y, cell.x, this.highestNumber);
  }.bind(this));
};

