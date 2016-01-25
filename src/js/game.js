function Game(opts){
  var options = opts || {};
  var gridSize = options.size || 5;
  this.highestNumber = options.highestNumber || 4;
  this.goalNumber = 10;
  var state = options.state;

  this.directions = {
    0: {col: 0, row:  -1}, // up
    1: {col: 1, row: 0}, // right
    2: {col: 0, row: 1}, // down
    3: {col: -1, row: 0}  // left
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
  var newRow = row + vec.row;
  var newCol = col + vec.col;
  if (!this.grid.outOfBounds(newRow, newCol)){
    return {
      row: newRow, 
      col: newCol, 
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
  for (var i=0; i<arr.length; i++){
    if (cell.row === arr[i].row && cell.col === arr[i].col) return i;
  }
  return -1;
};

// Merge given cell with any adjacent cells with the same value
// and increment the value of the new merged cell
Game.prototype.merge = function(row, col){
  if (!this.canMerge(row, col)) return;
  var selectedCell = {  
                        row: row,
                        col: col,
                        value: this.grid.cell(row,col)
                      };

  var mergeable = this.getMergeable(selectedCell);
  this.incrementTarget(mergeable.target);
  var replaced = this.replaceMergeable(mergeable.cells, mergeable.target);

  return {
            target: mergeable.target,
            merged: mergeable.cells,
            dropped: replaced.dropped,
            replaced: replaced.fromAbove
          };
};

// Recursively return cells that can be merged with the passed cell
Game.prototype.getMergeable = function(cell, mergeableCells){
  var mergeable = mergeableCells || { cells: [], target: cell };

  for(var dir=0; dir<4; dir++){
    var adjacent = this.adjacentCell(cell.row, cell.col, dir);
    if (!adjacent) continue;
    if (this.cellInArray(adjacent, mergeable.cells) >= 0) continue;

    if (mergeable.target.value === adjacent.value){
      if (adjacent.col === mergeable.target.col && adjacent.row > mergeable.target.row){
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
  this.grid.setCell(target.row, target.col, newVal);
};

Game.prototype.isTarget = function(cell, target){
  if (!cell || !target) return;
  return cell.col === target.col && cell.row=== target.row;
};

// Drop any cells above mergeable cells and replace with random number
Game.prototype.replaceMergeable = function(mergeable, target){
  var emptyCells = [];
  var dropped = [];
  var game = this;

  this.grid.eachCell(function(r,c,v){
    var cell = {row: r, col: c, value: v};
    if (this.cellInArray(cell, mergeable) && !this.isTarget(cell, target)){
      var above = {row: r-1, col: c, value: this.grid.cell(r-1, c)};
      if (above.value && above.value !== -1){
        this.grid.setCell(cell.row, cell.col, above.value);
        this.grid.setCell(above.row, above.col, -1);
        emptyCells.push(above);
        dropped.push(above);
      } else{
        this.grid.setCell(cell.row, cell.col, -1);
        emptyCells.push(cell);
      }
    }
  }.bind(this));

  emptyCells.forEach(function(cell){
    this.grid.replaceWithRandom(cell.row, cell.col, this.highestNumber);
  }.bind(this));

  return {
            dropped: dropped, 
            fromAbove: emptyCells
          };
};

