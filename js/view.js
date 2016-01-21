function View(game){
  this.game = game;
  this.gridDiv = document.getElementById('grid');

  this.gridDiv.addEventListener('click', this.merge.bind(this), false);
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

View.prototype.getCellRowCol = function(el) {
  var cell;
  if (el.classList.contains('cell')){
    cell = el;
  } else if (el.parentElement.classList.contains('cell')) {
    cell = el.parentElement;
  } else {
    return;
  }
  return {
            r: parseInt(cell.dataset.row),
            c: parseInt(cell.dataset.col), 
            value: parseInt(cell.firstChild.innerHTML)
          }
};

View.prototype.merge = function(){
  var cell = this.getCellRowCol(event.target);
  if (!cell) return;
  

};