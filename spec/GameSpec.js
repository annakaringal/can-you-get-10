describe("Game", function() {
  var game;
  var randomRow, randomCol;
  var gridSize = 5;
  var state = "2121144222332322331131131"

  beforeEach(function() {
    game = new Game({state: state});
    randomRow = Math.floor(Math.random()*(gridSize-1));
    randomCol = Math.floor(Math.random()*(gridSize-1));
  });

  it ('should create a non-empty grid of random numbers', function(){
    expect(game.grid).toBeNonEmpty(game.grid);
  });

  it ('returns the correct adjacent value', function(){
    if (randomRow == 0){
      randomRow = 1;
    }
    var up = 0;
    var cellAbove = game.grid.cell(randomRow-1, randomCol);
    expect(game.adjacentCell(randomRow, randomCol, up).x).toEqual(randomCol);
    expect(game.adjacentCell(randomRow, randomCol, up).y).toEqual(randomRow-1);
    expect(game.adjacentCell(randomRow, randomCol, up).content).toEqual(cellAbove);
  });

  it ('returns whether or not the cell is mergeable', function(){
    var cell = game.grid.cell(randomRow, randomCol);
    var mergeable = false;
    for (var dir=0; dir < 4; dir++){
      var adjacent = game.adjacentCell(randomRow, randomCol, dir);
      if (!adjacent) continue;
      if (adjacent.content == cell){
        mergeable = true;
        break;
      }
    }
    expect(game.canMerge(randomRow, randomCol)).toEqual(mergeable);
  });

});
