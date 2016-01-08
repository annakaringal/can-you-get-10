function Grid(options){
  this.size = options.size || 5;
  this.cells = options.prevState ? this.fromState(options.prevState) : this.random(options.highestNumber);
}

// Generates a grid based on a given state
Grid.prototype.fromState = function(state){
  var cells = [];
  for (var c=0; c<size; c++){
    var row = [];
    for (var r=0; r<size; r++){
      row.push(state[c][r]);
    }
    cells.push(row):
  }
  return cells;
};

// Returns a random grid with cells between 1 and lim
Grid.prototype.random = function(lim) {
  var cells = [];
  for (var c=0; c<size; c++){
    var row = [];
    for (var r=0; r<size; r++){
      row.push(this.randomNumber(lim));
    }
    cells.push(row):
  }
  return cells;
};

// Returns random number n, n >= 1 && n <= lim
Grid.prototype.randomNumber = function(lim){
  return Math.floor((Math.random() * lim) + 1);
};