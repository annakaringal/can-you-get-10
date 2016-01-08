function Game(size, highestNumber){
  this.size = size || 5;

  this.highestNumber = highestNumber || 4;
  this.goalNumber = 10;

  this.setup();
}

Game.prototype.setup = function(){
  this.grid = new Grid(this.size, this.highestNumber);
};