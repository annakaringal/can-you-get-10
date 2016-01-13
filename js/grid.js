function Grid(opts){
  var options = opts || {};
  this.size = options.size || 5;
  this.highestNumber = options.highestNumber || 4;
  this.cells = options.prevState ? this.fromState(options.prevState) : this.random(this.highestNumber);
}

// Call callback for every cell
Grid.prototype.eachCell = function (callback) {
  for (var row=0; row<this.size; row++) {
    for (var col=0; col<this.size; col++) {
      callback(row, col);
    }
  }
};

// Generates a grid based on a given state
Grid.prototype.fromState = function(state){
  var cells = [];
  for (var c=0; c<size; c++){
    var row = [];
    for (var r=0; r<size; r++){
      row.push(state[c][r]);
    }
    cells.push(row);
  }
  return cells;
};

// Returns a random grid with cells between 1 and lim
Grid.prototype.random = function(lim) {
  var cells = [];
  for (var c=0; c<this.size; c++){
    var row = [];
    for (var r=0; r<this.size; r++){
      row.push(this.randomNumber(lim));
    }
    cells.push(row);
  }
  return cells;
};

// Returns random number n, n >= 1 && n <= lim
Grid.prototype.randomNumber = function(lim){
  return Math.floor((Math.random() * lim) + 1);
};

// Returns cell content
Grid.prototype.cell = function(row, col){
  if (this.outOfBounds(row, col)) return;
  return this.cells[row][col];
};

// Replace cell content with a random number 
Grid.prototype.replaceWithRandom = function(row, col, lim){
  if (outOfBounds(row,col) || !lim) return;
  this.cells[row][col] = this.randomNumber(lim);
};

// Sets cell content to val
Grid.prototype.setCell = function(row, col, val){
  if (val < 1 || val > this.highestNumber || this.outOfBounds(row, col)) return;
  this.cells[row][col] = val;
};

// Checks to see if row & col are valid cells in grid
Grid.prototype.outOfBounds = function(row, col){
  var invalidRow = row < 0 || row >= this.size;
  var invalidCol = col < 0 || col >= this.size;
  return invalidRow || invalidCol;
}
