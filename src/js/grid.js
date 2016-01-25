function Grid(opts){
  var options = opts || {};
  var highestNumber = options.highestNumber || 4;
  this.emptyValue = -1;
  this.size = options.size || 5;
  this.cells = options.state ? this.fromState(options.state) : this.random(highestNumber);
}

// Call callback for every cell
Grid.prototype.eachCell = function (callback) {
  for (var row=0; row<this.size; row++) {
    for (var col=0; col<this.size; col++) {
      var val = this.cells[row][col];
      callback(row, col, val);
    }
  }
};

// Generates a grid based on a state given as a string
Grid.prototype.fromState = function(state){
  var cells = [];
  var count = 0;
  for (var c=0; c<this.size; c++){
    var row = [];
    for (var r=0; r<this.size; r++){
      row.push(parseInt(state[count]));
      count++;
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

// Returns cell value
Grid.prototype.cell = function(row, col){
  if (this.outOfBounds(row, col)) return;
  return this.cells[row][col];
};

// Replace cell value with a random number 
Grid.prototype.replaceWithRandom = function(row, col, lim){
  if (this.outOfBounds(row,col) || !lim) return;
  this.cells[row][col] = this.randomNumber(lim);
};

// Sets cell value to val
Grid.prototype.setCell = function(row, col, val){
  if (val < 1 || this.outOfBounds(row, col)) return;
  this.cells[row][col] = val;
};

// Set cell to empty value
Grid.prototype.setEmpty = function(row, col){
  if (this.outOfBounds(row, col)) return;
  this.cells[row][col] = this.emptyValue;
};

// Checks if cell is empty
Grid.prototype.isEmpty = function (row, col) {
  return this.cells[row][col] === this.emptyValue;
};

// Checks to see if row & col are valid cells in grid
Grid.prototype.outOfBounds = function(row, col){
  var invalidRow = row < 0 || row >= this.size;
  var invalidCol = col < 0 || col >= this.size;
  return invalidRow || invalidCol;
};

// Return state of grid as a string
Grid.prototype.toString = function(){
  var str = '';
  this.eachCell(function(_r, _c, val){
    str += val;
  });
  return str;
};