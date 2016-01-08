function Game(size, highestNumber){
  this.size = size || 5;

  this.highestNumber = highestNumber || 4;
  this.goalNumber = 10;

  this.setup();
}

Game.prototype.setup = function(){
  this.grid = new Grid(this.size, this.highestNumber);
};

Game.prototype.won = function() {
  return this.highestNumber == this.goalNumber;
};

Game.prototype.finished = function(){
  this.won() || !this.mergeAvailable();
};