describe("Game", function() {
  var game;
  var gridSize = 5;

  beforeEach(function() {
    game = new Game();
  });

  it ('should create a non-empty grid of random numbers', function(){
    expect(game.grid).toBeNonEmpty(game.grid);
  });

  it ('returns the correct adjacent value', function(){
    var randomRow = Math.floor(Math.random()*gridSize);
    var randomCol = Math.floor(Math.random()*gridSize);
    var up = 0;
    var cellAbove = game.grid.cell(randomRow-1, randomCol);
    expect(game.adjacentCell(randomRow, randomCol, up).x).toEqual(randomRow-1);
    expect(game.adjacentCell(randomRow, randomCol, up).y).toEqual(randomCol);
    expect(game.adjacentCell(randomRow, randomCol, up).content).toEqual(cellAbove);
  });

  it ('returns whether or not the cell is mergeable', function(){
    var randomRow = Math.floor(Math.random()*(gridSize-1));
    var randomCol = Math.floor(Math.random()*(gridSize-1));
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
    expect(function(){
      var can = game.canMerge(randomRow, randomCol);
      console.log(can);
      return can;
    }()).toEqual(mergeable);
  });

});
