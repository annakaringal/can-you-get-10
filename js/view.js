function View(game){
  this.game = game;
  this.gridDiv = document.getElementById('grid');

  this.renderCells();
}

View.prototype.renderCells = function(){
  var size = this.game.grid.size;

  this.game.grid.eachCell(function(r,c,val){ 
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = '<h1>' + val + '</h1>';
    cell.dataset.row = r;
    cell.dataset.col = c;
    this.gridDiv.appendChild(cell);
  }.bind(this));
};
