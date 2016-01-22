function View(game){
  this.game = game;
  this.gridDiv = document.getElementById('grid');

  this.gridDiv.addEventListener('click', this.merge.bind(this), false);
  this.renderCells();
}

View.prototype.renderCells = function(){
  var size = this.game.grid.size;

  this.game.grid.eachCell(function(row, col, val){ 
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = '<h1>' + val + '</h1>';
    cell.dataset.row = row;
    cell.dataset.col = col;
    this.gridDiv.appendChild(cell);
  }.bind(this));
};

View.prototype.getTargetCell = function(el) {
  var cell;
  if (el.classList.contains('cell')){
    cell = el;
  } else if (el.parentElement.classList.contains('cell')) {
    cell = el.parentElement;
  } else {
    return;
  }
  return {
            row: parseInt(cell.dataset.row),
            col: parseInt(cell.dataset.col), 
            value: parseInt(cell.firstChild.innerHTML)
          };
};

View.prototype.merge = function(){
  var cell = this.getTargetCell(event.target);
  if (!cell) return;

  var diff = this.game.merge(cell.row, cell.col);
  if (!diff) return;

  this.renderMerge(diff.merged, diff.target);
  this.renderDrop(diff.dropped);
  this.renderReplace(diff.replaced);
};

View.prototype.renderMerge = function(cellArr, target){

};

View.prototype.renderDrop = function(cellArr){

};

View.prototype.renderReplace = function(cellArr){

};