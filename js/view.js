function View(game){
  this.game = game;
  this.boardDiv = document.getElementById('board');

  this.renderCells();
}

View.prototype.renderCells = function(){
  var size = this.game.grid.size;

  this.game.grid.eachCell(function(_r,_c, content){ 
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = content;
    this.boardDiv.appendChild(cell);
  }.bind(this));
};