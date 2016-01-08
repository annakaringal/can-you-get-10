function Game(options){
  this.size = options.size || 5;

  this.highestNumber = options.highestNumber || 4;
  this.goalNumber = 10;

  this.setup();
}

Game.prototype.setup = function(){
  this.grid = new Grid({size: this.size, highestNumber: this.highestNumber});
};

Game.prototype.won = function() {
  return this.highestNumber === this.goalNumber;
};

Game.prototype.finished = function(){
  this.won() || !this.mergeAvailable();
};